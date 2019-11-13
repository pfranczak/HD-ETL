import express from 'express';
import {getDataFromUrl} from './etl';

const PORT = 3000;

const app = express();

app.get('/extract', async (req, res) => {
    res.send(await getDataFromUrl());
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))