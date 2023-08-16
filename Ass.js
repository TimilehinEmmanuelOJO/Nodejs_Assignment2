const http = require("http")
const HOSTNAME = 'localhost'
const PORT = 3001
const path = require('path')


const indexPath = path.join(__dirname,'index.html' )
console.log(indexPath)
//Without using a framework, build a web server to render html files: 
//When I navigate to “/index.html”, I should see a simple webpage of the student. 
//(Nothing fancy) Add another feature such that when I navigate to “{random}.html” 
//it should return with a 404 page

function requestHandler(req, res){
    res.write('Hello this is Timilehin')
    res.write("/n Hello again")
    res.end('Hello from the other side')
}



const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server created successfully at http://${HOSTNAME}:${PORT}`)
})