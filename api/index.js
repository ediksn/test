const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 9090
const app = express()
const server = http.createServer(app)

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors())

app.post('/send', async(req, res) => {
    res.status(200).json(req.body.message)
})

function handleFatalError(err) {
    console.log(err.stack)
    process.on("exit", function () {
        require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    });
    process.exit();
}

 function start() {
    process.on('uncaughtException', handleFatalError)
    process.on('unhandledRejection', handleFatalError)
    server.listen(port, '0.0.0.0', () => {
        console.log('Servidor funcionando')
    })
}

start()