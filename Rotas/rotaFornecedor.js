import {Router} from 'express';
import FornecedorCTRL from '../controle/fornecedorCTRL.js';

const rotaFornecedor = new Router();
const controleFornecedor = new FornecedorCTRL();
rotaFornecedor
.get("/", controleFornecedor.consultar)
.get("/:termo", controleFornecedor.consultar)
.post("/", controleFornecedor.gravar)
.put("/", controleFornecedor.alterar)
.patch("/", controleFornecedor.alterar)
.delete("/", controleFornecedor.excluir);

export default rotaFornecedor;