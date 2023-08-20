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
    if(req.url.startsWith === '/items/' && req.method === 'GET'){
        oneItem(req, res)
    }
    if (req.url.startsWith("/items/") && req.method === "PATCH") {
        updateItem(req, res);
      }
    
      if (req.url.startsWith("/items/") && req.method === "DELETE") {
        deleteItem(req, res);
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


//Get One Item
function oneItem(req, res){
    const id = req.url.split('/')[2]
    const items = fs.readFileSync(filepath)
    const itemsArrayOfObject = JSON.parse(item)

    const itemIndex = itemsArrayOfObject.findIndex((item)=>{
        return item.id === id
    })

    if(itemIndex === -1) {
        clientErr()
    }
    res.end(JSON.stringify(itemsArrayOfObject[itemIndex]))
}


//Update an Item
function updateItem(req, res) {
    const id = req.url.split("/")[2];
  
    const items = fs.readFileSync(filepath);
    const itemsArrayOfObj = JSON.parse(items);
  
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
  
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const update = JSON.parse(parsedBody);
  
      const itemIndex = itemsArrayOfObj.findIndex((item) => {
        return item.id === id;
      });
  
      if (itemIndex == -1) {
        res.end(`item not found`);
      }
  
      itemsArrayOfObj[itemIndex] = { ...itemsArrayOfObj[itemIndex], ...update };
  
      fs.writeFile(filepath, JSON.stringify(itemsArrayOfObj), (err) => {
        if (err) {
          serverErr()
        }
        res.end(JSON.stringify(itemsArrayOfObj[itemIndex]));
      });
    });
  }
  
  //========================TO DELETE AN ITEM==============
  function deleteItem(req, res) {
    const id = req.url.split("/")[2];
  
    const items = fs.readFileSync(filepath);
    const itemsArrayOfObj = JSON.parse(items);
  
    const itemIndex = itemsArrayOfObj.findIndex((item) => {
      return item.id === id;
    });
  
    if (itemIndex == -1) {
      res.end(`item not found`);
    }
  
    itemsArrayOfObj.splice(itemIndex, 1);
  
    fs.writeFile(filepath, JSON.stringify(itemsArrayOfObj), (err) => {
      if (err) {
        serverErr()
      }
  
      res.end(`item successfully deleted`);
    });
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
