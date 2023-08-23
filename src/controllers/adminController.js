const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");


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
    res.render("dashboard/category/listCategory", {dashboard:true});
});

//////////////////// FIM DASHBOARD ///////////////////////////////


module.exports = router;