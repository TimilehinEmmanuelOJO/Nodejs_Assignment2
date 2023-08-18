const http = require("http")
const HOSTNAME = 'localhost'
const PORT = 3001
const path = require('path')
const fs = require('fs')


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

    if(req.url.endsWith('.html') && req.method === 'GET'){
        try{
            getRandomWeb(req, res)
        }catch(err){
            getError(req, res)
        }
    }
}



const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server created successfully at http://${HOSTNAME}:${PORT}`)
})


//functions to handle stuffs

//This function reads the index.html file
function getWeb(req, res){
    res.setHeader('content-type', 'text/html')
    res.writeHead(200)
    res.end(fs.readFileSync(indexPath))
}

function getRandomWeb(req, res){
    const file = req.url.split('/')[1]
    const actualPath = path.join(__dirname, file)
    const web =fs.readFileSync(actualPath)
    res.setHeader('content-type', 'text.html')
    res.writeHead(200)
    res.end(web)
}

function getError (req, res){
    res.setHeader('content-type', 'text/html')
    res.writeHead(404)
    res.end(fs.readFileSync(errPath))
}