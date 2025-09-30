var express = require('express');
var router = express.Router();

// importacoes das bibliotecas

// deficiniao variaveis e constantes

// definicoes dos endpoints

/* obter todos os usuarios. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const users = []; // Array de usuarios (Banco de dados);

//Criar um usuário
router.post('/', (req, res) => {
  // Obter o JSON vindo pelo Body da requisição HTTP
  const user = req.body;

  console.log("Usuário: ", user);

  // Adicionar o banco de dados
  users.push(user);

  res.json(user);
});

// obter um usuario por id
router.get('/:id', (req, res) => {
  res.json({ message: `user com id ${req.params.id} encontrado.` });
}); 

// atualizar um usuario por id
router.put('/:id', (req, res) => {
  res.json({ message: `user com id ${req.params.id} atualizado.` });
});

// deletar um usuario por id
router.delete('/:id', (req, res) => {
  res.json({ message: `user com id ${req.params.id} deletado.` });
});

//obter todos os usuarios
router.get('/', (req, res) => {
  res.json(users);
});



module.exports = router;
