import express from 'express';
import matchRouter from './routes/match';
const app = express();
const PORT = process.env.PORT || 4000;


if(!PORT) {
    throw new Error('PORT is not defined');
}

app.use('/matchmaking', matchRouter);

app.get('/', (req, res) => {
    res.send('Matchmaking Service is running');
});

app.listen(PORT, () => {
    console.log(`Matchmaking Service is running on port ${PORT}`);
});



