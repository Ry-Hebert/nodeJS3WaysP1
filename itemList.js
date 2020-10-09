const Router = require('koa-router')

const router = new Router({
    prefix: '/itemList'
})

let itemList = [
    { id: 0, description: 'This is the first item'},
    { id: 1, description: 'This is the second item'},
    { id: 2, description: 'This is the third item'},
    { id: 3, description: 'This is the fourth item'}
]

router.get('/', (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: itemList
    }
    next()
})

router.get('/:id', (ctx, next) => {
    let getCurrentItem = itemList.filter( itemX => {
        if(itemX.id == ctx.params.id){
            return true
        }
    })

    if(getCurrentItem.length){
        ctx.body = getCurrentItem[0]
    }
    else{
        ctx.response.status = 404
        ctx.body = {
            status: 'error:',
            message: 'Item Not Found'
        }
    }
    next()
})

router.post('/new', (ctx, next) =>{
    if(
        !ctx.request.body.id ||
        !ctx.request.body.description
    ){
        ctx.response.status = 400
        ctx.body = 'please enter the data'
    }
    else{
        let newItemObj = itemList.push({id: ctx.request.body.id, description: ctx.request.body.description})
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: `New ItemObject added with id: ${ctx.request.body.id} & description: ${ctx.request.body.description}`
        }
    }
    next()
})

router.put('/:id', (ctx, next) =>{
    if(
        !ctx.request.body.id ||
        !ctx.request.body.description
    ){
        ctx.response.status = 400
        ctx.body = 'Bad Request, No Match'
    }
    else{
        let itemListSelect = itemList.map(itemObj =>{return itemObj.id}).indexOf(parseInt(ctx.request.body.id))

        if(itemListSelect === -1){
            let newItemObj = itemList.push({id: ctx.request.body.id, description: ctx.request.body.description})
            ctx.response.status = 201
            ctx.body = {
                status: 'success',
                message: `New ItemObject added with id: ${ctx.request.body.id} & description: ${ctx.request.body.description}`
            }
        }
        else{
            itemList[itemListSelect] = {id: ctx.request.body.id, description: ctx.request.body.description}
            ctx.body = {
                status: 'success',
                message: `The item with id: ${ctx.request.body.id} has been updated. id: ${ctx.request.body.id} description: ${ctx.request.body.description}`
            }
        }
    }
    next()
})

router.delete('/:id', (ctx, next) =>{
    let itemListDelete = itemList.map( itemObj => {return itemObj.id}).indexOf(parseInt(ctx.request.body.id))
    
    if(itemListDelete === -1){
        ctx.body = 'Error, item not found'
    }
    else{
        itemList.splice(itemListDelete, 1)
        ctx.body = {
            status: 'success',
            message: `The item that had the id: ${ctx.request.body.id} has been removed.`
        }
    }
})
//Test
module.exports = router