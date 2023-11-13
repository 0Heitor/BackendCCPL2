import {Router} from 'express';
import CategoriaCTRL from '../controle/categoriaCTRL.js';

const rotaCategoria = new Router();
const controleCategoria = new CategoriaCTRL();
rotaCategoria
.get("/", controleCategoria.consultar)
.get("/:termo", controleCategoria.consultar)
.post("/", controleCategoria.gravar)
.put("/", controleCategoria.alterar)
.patch("/", controleCategoria.alterar)
.delete("/", controleCategoria.excluir);

export default rotaCategoria;