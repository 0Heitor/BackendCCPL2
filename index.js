import express from "express";
import rotaProduto from "./Rotas/rotaProduto.js";
import rotaCategoria from "./Rotas/rotaCategoria.js";
import cors from 'cors';

const host = 'localhost';
const porta = 4000;

const servidorHTTP = express();

servidorHTTP.use(cors({
    origin:'*'
}));
servidorHTTP.use(express.json());

servidorHTTP.use("/produtos",rotaProduto);
servidorHTTP.use("/categorias",rotaCategoria);

servidorHTTP.listen(porta,host, () => {
    console.log("Servidor escutando em http://" + host + ":" +porta);
});