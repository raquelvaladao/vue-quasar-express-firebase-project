import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Recipe } from './models/Recipe';
dotenv.config();


const app: Express = express();
const { getFirestore } = require('firebase-admin/firestore');
const cors = require('cors')
const port = process.env.PORT;
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

app.use(cors())
// GET detalhes do produto por ID
// GET produtos considerando edições do banco

app.get('/all', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('fav').get();

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

app.post('/fav', async (req: Request, res: Response) => {
  const favorite: any = {
    id: req.body.id,
    fav: true
  };
  
  //if not
  //adicionar à collection food um alimento com id da API
  const docRef = db.collection('fav').doc(favorite.id); 

  await docRef.set(favorite);
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