import cors from 'cors';
import express from "express";
import rotaProduto from "./Rotas/rotaProduto.js";
import rotaCategoria from "./Rotas/rotaCategoria.js";
import rotaFornecedor from './Rotas/rotaFornecedor.js';
import rotaCliente from './Rotas/rotaCliente.js';

const host = 'localhost';
const porta = 4000;

const servidorHTTP = express();

servidorHTTP.use(cors({
    origin:'*'
}));
servidorHTTP.use(express.json());

servidorHTTP.use("/produtos",rotaProduto);
servidorHTTP.use("/categorias",rotaCategoria);
servidorHTTP.use("/fornecedores",rotaFornecedor);
servidorHTTP.use("/clientes",rotaCliente);

servidorHTTP.listen(porta,host, () => {
    console.log("Servidor escutando em http://" + host + ":" +porta);
});