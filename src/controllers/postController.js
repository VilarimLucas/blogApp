const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/post");
const Posts = mongoose.model("posts");

//vamos carregar nosso modelo 
require("../models/category");
const Categorys = mongoose.model("categorys");


//vamos carregar nosso modelo 
require("../models/autor");
const Autors = mongoose.model("autors");


router.post('/post/add', async (req, res) => {

    var erros = [];
    // if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
    //     erros.push({ texto: "NOME DE CATEGORIA inválido" });
    // }
    // if (!req.body.description || typeof req.body.description == undefined || req.body.description == null) {
    //     erros.push({ texto: "DESCRIÇÃO DE CATEGORIA inválido" });
    // }
    // if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    //     erros.push({ texto: "SLUG inválida" });
    // }
    if (erros.length > 0) {
        res.render("/create_post", { erros: erros });
    } else {

        const categoryId = parseInt(req.body.category); // ID da categoria selecionada
        const authorId = parseInt(req.body.author);     // ID do autor selecionado

        const category = await Categorys.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        // Procurar o autor pelo ID
        const author = await Autors.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado.' });
        }

        const newPost = {
            title: req.body.title,
            textPost: req.body.textPost,
            image: req.body.image,
            date: req.body.date,
            category: category,
            author: author
        };

        new Posts(newPost).save().then(() => {
            req.flash("success_msg", "Post criado com sucesso");
            res.redirect("/list_post");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao cadastrar Post");
            res.send('Houve um erro: ' + erro);
        });
    }
});



/*______ Fim das rotas das tarefas ___________ */
module.exports = router;