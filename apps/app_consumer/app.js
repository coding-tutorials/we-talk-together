const [node, file, appName] = process.argv
const logger = require('./logger')(process.env.SERVICE_NAME)

logger.info(`starting server with appName: ${process.env.SERVICE_NAME}`)

const { getServer } = require('./data')
const serverData = getServer(process.env.SERVICE_NAME)
const app = require('express')()

const metrics = require('./metrics')(process.env.SERVICE_NAME, app)

metrics.consumerConcurrentCalls.set(0)

app.get('/requestDish/:dish', (req, res) => {
    const { dish } = req.params
    
    logger.info(`dish requested ${dish}`)
    metrics.consumerConcurrentCalls.inc(1)
    const endMetric = metrics.consumerRequest.startTimer()

    setTimeout(() => {
        if(Math.random() < 0.9) {
            res.send('OK')
            logger.info(`dish responded`)
            
            endMetric({ status: 'ok', dish, service: process.env.SERVICE_NAME })
        } else {
            res.status(500).send('Error')
            logger.error(`error for dish: ${dish}`)
            endMetric({ status: 'error', dish, service: process.env.SERVICE_NAME })
        }
        
        metrics.consumerConcurrentCalls.dec(1)
    }, (Math.random() * serverData.weigth) * 1000);
})

app.listen(process.env.HTTP_PORT, () => {
    logger.info(`listening on port ${process.env.HTTP_PORT}`)
})


