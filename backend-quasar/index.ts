import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Recipe } from './models/Recipe';
dotenv.config();


const app: Express = express();
const { getFirestore } = require('firebase-admin/firestore');
const cors = require('cors')
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
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

app.get('/edited/:id', async (req, res) => {
  try {
    res.json(await getRecipe(req.params.id, 'edited'));
  } catch (error) {
    console.error('Erro ao listar dados da coleção "food":', error);
    res.json(null);
  }
});

app.get('/alledited', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('edited').get();

    const foods: any = [];
    snapshot.forEach((doc: any) => {
      foods.push(doc.data());
    });

    res.json(foods);
  } catch (error) {
    console.error('Erro ao listar dados da coleção "edited":', error);
    res.status(500).json({ error: 'Erro ao listar dados da coleção "food"' });
  }
});

//todo: id sem enviar, stt
app.post('/fav', async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    if (!id) {
      res.send('ID da receita não fornecido no corpo da requisição.');
    }

    const data = await getRecipe(req.body.id, 'fav');
    if (data) {
      const deleteResult = await db.collection('fav').doc(id).delete();
      return res.status(201).json({ message: 'Removido'});
    }

    const novoDoc = { id: id, fav: true };
    const docRef = db.collection('fav').doc(id);
    await docRef.set(novoDoc);

    return res.status(201).json({ message: 'Favorito'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro'});
  }
});

app.post('/edit/:id', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body) {
      res.send('body da receita não fornecido no corpo da requisição.');
    }
    const docRef = db.collection('edited').doc(req.params.id);
    await docRef.set(body);

    return res.status(201).json({ message: 'Editado'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro'});
  }
});

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});

async function getRecipe(id: any, coll: any) {
  const foodRef = db.collection(coll).doc(id);
  const doc = await foodRef.get();
  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
}