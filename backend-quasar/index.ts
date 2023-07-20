import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Recipe } from './models/Recipe';
dotenv.config();


const app: Express = express();
const { getFirestore } = require('firebase-admin/firestore');
const port = process.env.PORT;
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();


app.get('/all', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('food').get();

    const foods: any = [];
    snapshot.forEach((doc: any) => {
      foods.push(doc.data());
    });

    res.json(foods);
  } catch (error) {
    console.error('Erro ao listar dados da coleção "food":', error);
    res.status(500).json({ error: 'Erro ao listar dados da coleção "food"' });
  }
});

app.get('/test', async (req: Request, res: Response) => {
  const novoDoc: Recipe = {
    calories: 210,
    carbs: '43g',
    fat: '3g',
    id: 90629,
    image: 'https://spoonacular.com/recipeImages/90629-312x231.jpg',
    protein: '1g',
    title: 'Teste'
  };
  
  //if not
  //adicionar à collection food um alimento com id da API
  const docRef = db.collection('food').doc(novoDoc.id); 

  await docRef.set(novoDoc);
  res.send(await getFoodList());
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

async function getFoodList() {
  const snapshot = await db.collection('food').get();
  snapshot.forEach((doc: any) => {
    console.log(doc.id, '=>', doc.data());
  });
  return "Adicionado!";
}
