var express = require('express');
var router = express.Router();
const User = require('../models/User');
const isAutheniticated = require('../middleware/isAutheticated');


/* obter todos os usuarios. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const users = []; // Array de usuarios (Banco de dados);

//Criar um usuário
router.post('/', async (req, res) => {
  // Obter o JSON vindo pelo Body da requisição HTTP
  const json = req.body;

  const user = await new User(json);

  const hasErrors = await user.validateSync();

  return hasErrors 
  ? res.status(400).json(hasErrors) 
  : res.json(await user.save());
  
});

// Obter todos os usuarios
router.get('/', [isAutheniticated], async function(req, res, next) {
  const { name = '' } = req.query;

  return res.json(
    await User.find({name: { $regex: '.*' + name + '.*' } }));
});

// Obter um usuário pelo ID
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;
  const user = await User.findById(id);
  if(!user) {
    return res.status(404).json({ error: 'Usuário não encontrado!' });
  }
  return res.json(user);
});


// Deletar um usuário pelo ID
router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if(!user) {
    return res.status(404).json({ error: 'Usuário não encontrado!' });
  }
  return res.json({ message: 'Usuário deletado com sucesso!' });
});

// Atualizar um usuário pelo ID
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const json = req.body;

  const user = await User.findByIdAndUpdate(id, json, { new: true, runValidators: true });
  if(!user) {
    return res.status(404).json({ error: 'Usuário não encontrado!' });
  }
  return res.json(user);
});




module.exports = router;
