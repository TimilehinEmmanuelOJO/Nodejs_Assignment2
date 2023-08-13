const http = require("http")
const HOSTNAME = 'localhost'
const PORT = 3001


function requestHandler(req, res){
    res.write('Hello this is Timilehin')
    res.write("/n Hello again")
    res.end('Hello from the other side')
}



const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server created successfully at http://${HOSTNAME}:${PORT}`)
})