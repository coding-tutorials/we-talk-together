const Prometheus = require('prom-client')

const registerMetricsEndpoint = (metricsRegister, app) => {
    const registerEndpoint = (metricsRegister, app) => {
        app.get('/metrics', async(req, res) =>  {
            res.setHeader('Content-Type', metricsRegister.contentType)
            res.end(await metricsRegister.metrics())
        }) 
    }

    // producer doesnt have a server
    if(!app) {
        const express = require('express')
        const app = express()
        return app.listen(process.env.HTTP_PORT, () => {
            registerEndpoint(metricsRegister, app)
        })
    }

    registerEndpoint(metricsRegister, app)
}


module.exports = (appLabel, app) => {
    // Add a default label which is added to all metrics
    const register = new Prometheus.Registry()
    register.setDefaultLabels({
        app: appLabel
    })

    const producerRequest = new Prometheus.Histogram({
        name: 'producer_request',
        help: 'Duration of producer HTTP requests',
        labelNames: ['status', 'dish'],
    })

    const consumerRequest = new Prometheus.Histogram({
        name: 'consumer_request',
        help: 'Duration of producer HTTP requests',
        labelNames: ['status', 'service', 'dish'],
    })

    const consumerConcurrentCalls = new Prometheus.Gauge({
        name: 'consumer_concurrent_call',
        help: 'Consumer concurrent calls',
        labelNames: ['service'],
    });

    // Register the histogram
    register.registerMetric(producerRequest)
    register.registerMetric(consumerRequest)
    register.registerMetric(consumerConcurrentCalls)

    // Start endpoint for Prometheus metrics gathering
    registerMetricsEndpoint(register, app)

    return {
        register,
        producerRequest,
        consumerRequest,
        consumerConcurrentCalls
    }
}