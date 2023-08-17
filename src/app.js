//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();
const admin = require("./controllers/admin");

//Configurações

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// arquivos estaticos
app.use('/bootstrapStyle', express.static('public/bootstrap/css'));
app.use('/bootstrapScript', express.static('public/bootstrap/js'));
app.use('/bootstrapIcons', express.static('public/bootstrap/icons/font'));
app.use('/style', express.static('public/css'));
app.use('/jQuery', express.static('public/js/jquery'));

app.use('/images', express.static('public/img'));
app.use('/fonts', express.static('public/fonts'));

// ROTAS

app.use("/", admin);

const PORT = 8081;
app.listen(PORT, () =>{
    console.log("Servidor Rodando");
});