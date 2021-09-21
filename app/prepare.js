
const tar = require('tar')

const http = require("http");
// const { createHash } = require('crypto')
const fnv = require('fnv-plus')
const buffer = require("buffer");

var pack = new tar.Pack({gzip:true,highWaterMark:10*1024})
let option = {
    host: "127.0.0.1",
    path: "/api/prepare",
    port: 7001,
    method:"POST",
    headers:{
        'Content-Type': 'application/octet-stream',
        'Connection': 'keep-alive',
    }
}

let req = http.request(option)
// req.on()
// fstream.Reader({'path':"/home/bryandu/桌面/原片",'type':'Directory'})
// .pipe()
// pipeline(
//
//
// )
pack.add("/home/bryandu/桌面/1").end()

pack.on('data',chunk=>{
    let hash = fnv.hash(chunk,64).hex()
    let bu = new Buffer.from(hash)
    let c = Buffer.concat([bu,chunk])
    console.log(hash)
    req.write(c)
    pack.pause()
})
pack.on('end',()=>{
    req.write('end')
})
req.on('response',response => {
    response.on('data',chunk => {
        console.log(chunk.toString('utf8'))
        if (chunk.toString('utf8') === 'recv'){
            pack.resume()
        }
    })
})