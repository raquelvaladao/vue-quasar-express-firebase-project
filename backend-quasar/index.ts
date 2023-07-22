import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Recipe } from './models/Recipe';
dotenv.config();


const app: Express = express();
const { getFirestore } = require('firebase-admin/firestore');
const port = process.env.PORT;
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

// GET detalhes do produto por ID
// GET produtos considerando edições do banco

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

app.post('/fav', async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send('ID da receita não fornecido no corpo da requisição.');
    }

    const data = await getRecipe(req.body.id);
    if (data) {
      const deleteResult = await db.collection('fav').doc(data.id).delete();
      return res.status(201).json({ message: 'Removido'});
    }

    const novoDoc = { fav: true };
    const docRef = db.collection('fav').doc(req.body.id);
    await docRef.set(novoDoc);

    return res.status(201).json({ message: 'Favorito'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro'});
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

async function getRecipe(id: any) {
  const foodRef = db.collection('fav').doc(id);
  const doc = await foodRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
}

async function getFoodList() {
  const snapshot = await db.collection('food').get();
  snapshot.forEach((doc: any) => {
    console.log(doc.id, '=>', doc.data());
  });
  return "Adicionado!";
}
