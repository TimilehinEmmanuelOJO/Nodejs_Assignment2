const fs = require("fs")
const path = require('path')
const http = require("http")


const HOSTNAME = 'localhost'
const PORT = 3000


const filepath = path.join(__dirname, 'items.json')
// console.log(filepath)

function requestHandler(req, res){
    if(req.url === '/items' && req.method === 'POST'){
        createItem(req, res)
    }
    if(req.url === "/items" && req.method === 'GET'){
        getAllItems(req, res)
    }
}



const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`)
})


//Function Handlers

//1. Create item

function createItem(req, res){
    const stringOB = fs.readFileSync(filepath)
    const turnToObj = JSON.parse(stringOB)
    console.log(turnToObj)


const body = []
req.on("data", (chunk) => {
    body.push(chunk)
})
req.on('end', () => {
    const parsedBody = body.toString()
    const itemsToPost = JSON.parse(parsedBody)

    turnToObj.push({
        ...itemsToPost,
        id: Math.floor(Math.random()*500).toString()
    })

    fs.writeFile(filepath,JSON.stringify(turnToObj), (err) => {
        if (err){
            serverErr()
        }
       res.end(JSON.stringify(itemsToPost)) 
    })
})
}


//Function to get all items
function getAllItems(req, res){
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err){
            serverErr()
        }
        res.end(data)
    })
}





//Use this to handle errors

function serverErr(){
    res.writeHead('500')
    res.end('Internal Server Error')
}

function clientErr(){
    res.writeHead('404')
    res.end("Error 404, Page not found")
}
