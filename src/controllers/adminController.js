const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

//vamos carregar nosso modelo 
require("../models/category");
const Categorys = mongoose.model("categorys");

//vamos carregar nosso modelo 
require("../models/autor");
const Autors = mongoose.model("autors");

//vamos carregar nosso modelo 
require("../models/post");
const Posts = mongoose.model("autors");


router.get("/", (req, res) => {
    res.render("admin/index", {dashboard:false});
});

router.get("/blog", (req, res) => {
    res.render("blog/index", {dashboard:false});
});

router.get("/categorias", (req, res) => {
    res.send("Página de categorias");
});

router.get("/login", (req, res) => {
    res.render("admin/login", {dashboard:false});
});


///////////////////////// DASHBOARD ////////////////////////////////

router.get("/dashboard", (req, res) => {
    res.render("dashboard/index", {dashboard:true});
});

// CATEGORY
router.get("/create_category", (req, res) => {
    res.render("dashboard/category/cadCategory", {dashboard:true});
});

router.get("/list_category", (req, res) => {

    Categorys.find().lean().then((category) => {
        res.render("dashboard/category/listCategory", { dashboard:true, category: category });
    });
});

// AUTOR
router.get("/create_autor", (req, res) => {
    res.render("dashboard/autor/cadAutor", {dashboard:true});
});

router.get("/list_autor", (req, res) => {
    Autors.find().lean().then((autor) => {
        res.render("dashboard/autor/listAutor", { dashboard:true, autor: autor });
    });
});

// POST
router.get("/create_post", (req, res) => {
    Autors.find().lean().then((autor) => {
        Categorys.find().lean().then((category) => {
            res.render("dashboard/post/cadPost", {dashboard:true, autor: autor, category: category});
        });
    });
});

router.get("/list_post", (req, res) => {
    Posts.find().lean().then((post) => {
        res.render("dashboard/post/listPost", { dashboard:true, post: post });
    });
});


//////////////////// FIM DASHBOARD ///////////////////////////////


module.exports = router;