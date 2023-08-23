const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/autor");
const Autors = mongoose.model("autors");


router.post('/autor/add', async (req, res) => {

    var erros = [];
    // if (!req.body.nameAutor || typeof req.body.nameAutor == undefined || req.body.nameAutor == null) {
    //     erros.push({ texto: "NOME DE CATEGORIA inválido" });
    // }
    // if (!req.body.training || typeof req.body.training == undefined || req.body.training == null) {
    //     erros.push({ texto: "DESCRIÇÃO DE CATEGORIA inválido" });
    // }
    // if (!req.body.profession || typeof req.body.profession == undefined || req.body.profession == null) {
    //     erros.push({ texto: "SLUG inválida" });
    // }
    if (erros.length > 0) {
        res.render("/create_autor", { erros: erros });
    } else {

        const newAutor = {
            nameAutor: req.body.nameAutor,
            training: req.body.training,
            profession: req.body.profession
        };

        new Autors(newAutor).save().then(() => {
            req.flash("success_msg", "Autor criado com sucesso");
            res.redirect("/list_autor");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao cadastrar Categoria");
            res.send('Houve um erro: ' + erro);
        });
    }
});



module.exports = router;
