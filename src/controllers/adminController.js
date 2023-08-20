const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");


router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/blog", (req, res) => {
    res.render("blog/index");
});

router.get("/categorias", (req, res) => {
    res.send("Página de categorias");
});

router.get("/login", (req, res) => {
    res.render("admin/login");
});


module.exports = router;