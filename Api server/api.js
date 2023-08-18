const fs = require("fs")
const path = require('path')
const http = require("http")


const HOSTNAME = 'localhost'
const PORT = 3000


function requestHandler(req, res){

}



const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`)
})