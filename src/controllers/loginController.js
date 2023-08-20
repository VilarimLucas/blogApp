const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/logins");
const Logins = mongoose.model("logins");

router.post('/login/add', (req, res) => {

    var erros = [];
    if (!req.body.username || typeof req.body.username == undefined || req.body.username == null) {
        erros.push({ texto: "Nome inválido" });
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "E-mail inválido" });
    }
    if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        erros.push({ texto: "Senha inválida" });
    }
    if (erros.length > 0) {
        res.render("admin/login", { erros: erros });
    } else {
        const newLogin = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        new Logins(newLogin).save().then(() => {
            req.flash("success_msg", "Login criado com sucesso");
            res.redirect("/login");
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao cadastrar Login");
            res.send('Houve um erro: ' + erro);
        });
    }
});



/*______ Fim das rotas das tarefas ___________ */
module.exports = router;