import express from 'express'
import path from 'path'
//import bodyParser from 'body-parser'
import { apiRouter } from './routes/api.route.js'
//import { productRouter } from './routes/product.route.js'
import { cardRouter } from './routes/card.route.js'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

mongoose.set('useFindAndModify', false);

dotenv.config()

const port = process.env.PORT || 5050

const app = express()

app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

//app.use(express.static('public'))

app.use(express.static(path.join(__dirname, '_client/build')))

app.use('/api', apiRouter)

//app.use('/product', productRouter)

app.use('/card', cardRouter)

app.use((req, res, next) => {
    res.status(404).send('<h1>That did not work: Page not found!</h1>')
})

const main = async () => {
    await mongoose.connect(`${process.env.DGM4790_CONNECTION_STRING}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    app.listen(port, () => {
        console.log('Testing app listening at http://localhost:${port}')
    })
    
}


main()