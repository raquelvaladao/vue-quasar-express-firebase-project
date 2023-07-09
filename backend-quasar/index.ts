import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { fire } from './middlewares/Firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { Recipe } from './models/Recipe';

const app: Express = express();
const port = process.env.PORT;
const db = getFirestore(fire)

dotenv.config();

app.get('/', async (req: Request, res: Response) => {
  const list = await getFoodList();
  res.send(list);
});

app.get('/test', async (req: Request, res: Response) => {
  const novoDoc: Recipe = {
    calories: 210,
    carbs: '43g',
    fat: '3g',
    id: 90629,
    image: 'https://spoonacular.com/recipeImages/90629-312x231.jpg',
    protein: '1g',
    title: 'Baked Apples in White Wine'
  };
  
  //if not
  addDoc(collection(db, "food"), novoDoc);
  res.send(await getFoodList());
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

async function getFoodList() {
  const coll = collection(db, 'food');
  const docs = await getDocs(coll);
  const list = docs.docs.map(doc => doc.data());
  return list;
}
