import express from 'express';
import router from './Router.js';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api', router);

app.post('/', (req, res) => {
    console.log('Все ок');
    res.status(200).json({ message: "Все ок" });
});

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});
