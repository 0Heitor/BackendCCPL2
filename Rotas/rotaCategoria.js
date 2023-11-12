import {Router} from 'express';
import CategoriaCTRL from '../controle/categoriaCTRL.js';

//cria uma micro aplicação http
const rotaCategoria = new Router();
const controleCategoria = new CategoriaCTRL();
rotaCategoria
.get("/", controleCategoria.consultar)
//.get("/:id", controleCategoria.consultarID)
.post("/", controleCategoria.gravar)
.put("/", controleCategoria.alterar)
.delete("/", controleCategoria.excluir);

export default rotaCategoria;