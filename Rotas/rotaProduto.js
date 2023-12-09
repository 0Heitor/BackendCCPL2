import {Router} from 'express';
import ProdutoCTRL from '../controle/produtoCTRL.js';

const rotaProduto = new Router();
const controleProduto = new ProdutoCTRL();
rotaProduto
.get("/", controleProduto.consultar)
.get("/:termo", controleProduto.consultarID)
.post("/", controleProduto.gravar)
.put("/", controleProduto.alterar)
.patch("/", controleProduto.alterar)
.delete("/", controleProduto.excluir);

export default rotaProduto;