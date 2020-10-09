const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody())

let itemList = require('./itemList.js')

app.use(itemList.routes())

app.listen(3210)