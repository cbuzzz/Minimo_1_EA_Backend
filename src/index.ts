import express,{RequestHandler} from 'express'
import cors from 'cors'
import userRouter from './routes/userRoute'
import experienciasRouter from './routes/experienciasRoute'
import wineRouter from './routes/wineRoute'
import { run } from './database/mongo_conn'
import messageRoute from './routes/messageRoute'

const app = express()
app.use(express.json())
run();

app.use(cors());
app.use(express.json() as RequestHandler);

const PORT = 3000;

app.get('/ping', (_req , res) => {
    console.log('ping recivido correctamente')
    res.send('pinged')
})

app.use('/api/user',userRouter)
app.use('/api/experiencias',experienciasRouter)
app.use('/api/wine',wineRouter)
app.use('/api/messages', messageRoute);

app.listen(PORT, () => {
    console.log('el servidor esta escuchando en el puerto '+ PORT)
})