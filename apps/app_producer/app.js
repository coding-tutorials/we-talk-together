const axios = require('axios').default
const { data } = require('./data')
const logger = require('./logger')(process.env.SERVICE_NAME)
const metrics = require('./metrics')(process.env.SERVICE_NAME)

logger.info(`initializing ${process.env.SERVICE_NAME}`)

const dishesWithServer = data.reduce((acc, server) => {
    const dishes = server.dishes.map((dish) => ({ server, dish }))
    return acc.concat(dishes)
}, [])

const getRandomDish = () => dishesWithServer[Math.floor(Math.random()*dishesWithServer.length)];

setInterval(() => {
    const { server, dish } = getRandomDish()
    const url = `http://localhost:${server.httpPort}/requestDish/${dish}`

    const endMetric = metrics.producerRequest.startTimer()

    axios.get(url).then((response) => {
        endMetric({ status: 'ok', dish})
        logger.info('got the response')
    })
    .catch((e) => {
        endMetric({ status: 'error', dish})
        logger.error(e)
    })
}, 10)
