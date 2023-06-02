import * as express from 'express';
import { Request, Response }  from 'express';
import { sortProducts } from './src/controllers/productController';

const app = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
  res.send('Please go to /sort!')
})

app.get('/sort', async (req: Request, res: Response) => {
  try {
    var sorted = await sortProducts();
    
    res.sendFile(sorted, () => {})
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

   