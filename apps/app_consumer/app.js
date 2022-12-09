const [node, file, appName] = process.argv
const logger = require('./logger')(appName)

logger.info(`starting server with appName: ${appName}`)

const { getServer } = require('./data')
const serverData = getServer(appName)
const app = require('express')()

app.get('/requestDish/:dish', (req, res) => {
    const { dish } = req.params
    
    logger.info(`dish requested ${dish}`)

    setTimeout(() => {
        res.send('OK')
        logger.info(`dish responded`)
    }, (Math.random() * serverData.weigth) * 1000);
})

app.listen(serverData.httpPort, () => {
    logger.info(`listening on port ${serverData.httpPort}`)
})


