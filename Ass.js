const http = require("http")
const HOSTNAME = 'localhost'
const PORT = 3001
const path = require('path')


//joined the path for the html file
const indexPath = path.join(__dirname,'index.html' )
//joined the path for the error file
const errPath = path.join(__dirname, '404.html')
//Without using a framework, build a web server to render html files: 
//When I navigate to “/index.html”, I should see a simple webpage of the student. 
//(Nothing fancy) Add another feature such that when I navigate to “{random}.html” 
//it should return with a 404 page

function requestHandler(req, res){
    if(req.url === '/'){
        getWeb(req, res)
    }
}



const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server created successfully at http://${HOSTNAME}:${PORT}`)
})


//functions to handle stuffs
function getWeb(req, res){
    res.setHeader('content-type', 'text/html')
    res.writeHead(200)
    res.end(fs.readFileSync(indexPath))
}