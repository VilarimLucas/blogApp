const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/post");
const Posts = mongoose.model("posts");

require("../models/category");
const Categorys = mongoose.model("categorys");

require("../models/autor");
const Authors = mongoose.model("autors");

// Rota para cadastrar um post utilizando os recurso do Template Engine: HANDLEBARS
router.post('/post/add', async (req, res) => {
    try {

        // Verifique se a categoria e o autor existem no banco de dados
        var categoryDoc = Categorys();
        categoryDoc = await Categorys.findById(req.body.category);
        
        var authorDoc = Authors();
        authorDoc = await Authors.findById(req.body.author);

        // Se a categoria ou o autor não forem encontrados, retorne um erro
        if (!categoryDoc || !authorDoc) {
            return res.status(400).send('Categoria ou autor não encontrados.');
        }

        var posts = new Posts();

        posts.title = req.body.title;
        posts.textPost = req.body.textPost;
        posts.image = req.body.image;
        posts.date =  req.body.date;
        posts.category =  categoryDoc;
        posts.author =  authorDoc;


        posts.save().then(() => {
            res.redirect("/list_post");
        }).catch((erro) => {
            res.send('Houve um erro: ' + erro);
        });

    } catch (error) {
        // Trate os erros adequadamente
        console.error('Erro ao criar o post:', error);
        res.status(500).send('Erro ao criar o post.');
    }
});

// Rota para listar todos os posts (endpoint)
router.get('/all', async (req, res) => {
    try {
      // Use o método find do Mongoose para buscar todos os posts
      const posts = await Posts.find();
      // Responda com os posts em formato JSON
      res.json(posts);
    } catch (error) {
      // Lida com erros, se houver algum
      res.status(500).json({ error: 'Erro ao buscar posts' });
    }
  });

/*______ Fim das rotas das tarefas ___________ */
module.exports = router;