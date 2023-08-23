const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/category");
const Categorys = mongoose.model("categorys");

router.post('/category/add', async (req, res) => {

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
        res.render("/create_category", { erros: erros });
    } else {

        const newCategory = {
            nameCategory: req.body.nameCategory,
            description: req.body.description,
            slug: req.body.slug
        };

        new Categorys(newCategory).save().then(() => {
            req.flash("success_msg", "Categoria criado com sucesso");
            res.redirect("/list_category");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao cadastrar Categoria");
            res.send('Houve um erro: ' + erro);
        });
    }
});


module.exports = router;
