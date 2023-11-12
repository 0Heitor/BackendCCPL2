import {Router} from 'express';
import ProdutoCTRL from '../controle/produtoCTRL.js';

//cria uma micro aplicação HTTP
const rotaProduto = new Router();
const controleProduto = new ProdutoCTRL();
rotaProduto
.get("/", controleProduto.consultar)
//.get("/:id", controleProduto.consultarID)
.post("/", controleProduto.gravar)
.put("/", controleProduto.alterar)
.delete("/", controleProduto.excluir);

export default rotaProduto;