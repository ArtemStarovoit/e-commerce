import express from 'express'
import { connect } from 'mongoose'
import { MONGO, PORT } from './config'
import { Items } from './models/shop-item'
import { Order } from './models/order'
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

connect(MONGO, (err) => {
    if(err) throw err
    console.log('Мы подключились')
})

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/shop-items', async (req, res) => {
    try {
        const gerItems = await Items.find().sort({_id: 1})
        if(!gerItems) throw new Error('Не найдены товары')
        res.status(200).send(gerItems)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get('/api/shop-items/:id', async (req, res) => {
    try {
        const gerItem = await Items.findOne({id: req.params.id})
        if(!gerItem) throw new Error('Не найдены товары')
        res.status(200).send(gerItem)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/api/shop-items', async (req, res) => {
    try {
        const result = await Order.insertMany(req.body)
        if(!result) throw new Error('Товар не добавлен')
        res.status(200).send(result)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.post('/api/shop-items/search', async (req, res) => {
    try {
        const result = await Items.find({ $text: {$search: req.body.search} })
        if(!result) throw new Error('Товар не добавлен')
        res.status(200).send(result)
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.listen(PORT, () => {console.log('Сервер запущен')})