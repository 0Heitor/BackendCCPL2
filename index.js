import Produto from './modelo/produto.js';
import Categoria from './modelo/categoria.js';

const categoria = new Categoria();
categoria.consultar('calçado').then((listaCategorias)=>{
    console.log(listaCategorias);
});

const produto = new Produto( 1, 'Tênis Infantil AllStar', 55.36, 159.99, 'indeterminada', 10, categoria);

console.log(produto.toJSON());