const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/logins");
const Logins = mongoose.model("logins");

router.post('/login/add', async (req, res) => {

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

        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

        const newLogin = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
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

router.post('/login/auth', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Logins.findOne({ email: email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                req.session.id_login = user._id; // Store user ID in the session
                res.redirect('/dashboard'); // Redirect to the dashboard after successful login
            } else {
                res.send('Credenciais inválidas');
            }
        } else {
            res.send('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.send('Houve um erro ao fazer o login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        res.redirect('/login');
    });
});

/*______ Fim das rotas das tarefas ___________ */
module.exports = router;