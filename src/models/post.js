const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Importar os modelos de Category e Autor
require('./db'); // Certifique-se de que isso está apontando para o arquivo correto

// Esquema para o modelo de Post
const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    textPost: {
        type: String,
        required: true
    },
    image: {
        type: String, // Pode ser uma URL da imagem ou caminho local
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Define a data atual como padrão
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categorys", // Nome do modelo de categorias
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "autors", // Nome do modelo de autores
        required: true
    }
});

mongoose.model("posts", Post); // Criar o modelo "posts" com base no esquema acima
