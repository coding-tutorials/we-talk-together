const axios = require('axios').default
const { data } = require('./data')
const logger = require('./logger')('producer')

logger.info('initializing producer')

const dishesWithServer = data.reduce((acc, server) => {
    const dishes = server.dishes.map((dish) => ({ server, dish }))
    return acc.concat(dishes)
}, [])

const getRandomDish = () => dishesWithServer[Math.floor(Math.random()*dishesWithServer.length)];

let concurrentRequests = 0

setInterval(() => {
    const { server, dish } = getRandomDish()
    const url = `http://localhost:${server.httpPort}/requestDish/${dish}`

    concurrentRequests++
    axios.get(url)
    .then((response) => {
        logger.info('got the response')

    })
    .catch((e) => logger.error(e))
    .finally(() => {
        concurrentRequests--
    })

    console.log(concurrentRequests)

}, 500)
