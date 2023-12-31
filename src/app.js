//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();


const admin = require("./controllers/adminController");
const rota_login =require('./controllers/loginController');
const rota_category =require('./controllers/categoryController');
const rota_autor =require('./controllers/autorController');
const rota_post = require('./controllers/postController');


//Módulo padrão do node para manipular diretórios e pastas
const path = require("path");

//novo
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

//Configurações





//Session
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Configuração básica do CORS para permitir todas as origens
app.use(cors());

// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Mongoose
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("Conectado ao mongo");
}).catch((err) => {
    console.log("Erro ao ser conectar: " + err);
});


// arquivos estaticos
app.use('/bootstrapStyle', express.static('public/bootstrap/css'));
app.use('/bootstrapScript', express.static('public/bootstrap/js'));
app.use('/bootstrapIcons', express.static('public/bootstrap/icons/font'));

app.use('/style', express.static('public/css'));
app.use('/script', express.static('public/js'));

app.use('/iconDashboard', express.static('public/iconDashboard'));
app.use('/pagesDashboard', express.static('public/pagesDashboard'));

app.use('/images', express.static('public/img'));
app.use('/fonts', express.static('public/fonts'));

// ROTAS

app.use("/", admin);
app.use("/rota_login", rota_login);
app.use("/rota_category", rota_category);
app.use("/rota_autor", rota_autor);
app.use("/rota_post", rota_post);

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Rodando");
});