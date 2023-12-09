import Produto from '../modelo/produto.js';
import Categoria from '../modelo/categoria.js';
import conectar from './conexao.js';

export default class ProdutoDAO{
    async gravar(produto){
        if(produto instanceof Produto){
            const sql = "INSERT INTO produto(prod_descricao, prod_precoCusto, prod_precoVenda, prod_dataValidade, prod_qtdEstoque, cat_codigo) VALUES(?,?,?,?,?,?)";
            const parametros = [produto.descricao, produto.precoCusto, produto.precoVenda,
            produto.dataValidade, produto.qtdEstoque, produto.categoria.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            produto.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(produto){
        if(produto instanceof Produto){
            const sql = "UPDATE produto set prod_descricao = ?, prod_precoCusto = ?, prod_precoVenda = ?, prod_dataValidade = ?, prod_qtdEstoque = ?, cat_codigo = ? WHERE prod_codigo = ?";
            const parametros = [produto.descricao, produto.precoCusto, produto.precoVenda, produto.dataValidade, produto.qtdEstoque, produto.categoria.codigo, produto.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(produto){
        if(produto instanceof Produto){
            const sql = "DELETE FROM produto WHERE prod_codigo = ?";
            const parametros = [produto.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        let sql='';
        let parametros=[];
        if (!isNaN(parseInt(termo))){
            sql=`SELECT p.prod_codigo, p.prod_descricao,
            p.prod_precoCusto, p.prod_precoVenda, p.prod_dataValidade, 
            p.prod_qtdEstoque,
            c.cat_codigo, c.cat_descricao
            FROM produto p INNER JOIN categoria c ON p.cat_codigo = c.cat_codigo
            WHERE p.prod_codigo = ?
            ORDER BY p.prod_descricao               
            `;
            parametros = [termo];
        }
        else{
            if(!termo){
                termo = '';
            }
            sql = `SELECT p.prod_codigo, p.prod_descricao,
            p.prod_precoCusto, p.prod_precoVenda, p.prod_dataValidade, 
            p.prod_qtdEstoque,
            c.cat_codigo, c.cat_descricao
            FROM produto p INNER JOIN categoria c ON p.cat_codigo = c.cat_codigo
            WHERE p.prod_descricao like ?
            ORDER BY p.prod_descricao               
            `;
            parametros = ['%'+termo+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaProdutos = [];
        for (const registro of registros){
            const categoria = new Categoria(registro.cat_codigo,registro.cat_descricao);
            const produto = new Produto(registro.prod_codigo,registro.prod_descricao,
                                        registro.prod_precoCusto,registro.prod_precoVenda,
                                        registro.prod_dataValidade, registro.prod_qtdEstoque,
                                        categoria);
            listaProdutos.push(produto);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaProdutos;
    }

    async consultarID(termo){
        let sql='';
        let parametros=[];
        sql = `SELECT p.prod_codigo, p.prod_descricao,
        p.prod_precoCusto, p.prod_precoVenda, p.prod_dataValidade, 
        p.prod_qtdEstoque,
        c.cat_codigo, c.cat_descricao
        FROM produto p INNER JOIN categoria c ON p.cat_codigo = c.cat_codigo
        WHERE c.cat_codigo = ?
        ORDER BY p.prod_descricao               
        `;
        parametros = [termo];
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaProdutos = [];
        for (const registro of registros){
            const categoria = new Categoria(registro.cat_codigo,registro.cat_descricao);
            const produto = new Produto(registro.prod_codigo,registro.prod_descricao,
                                        registro.prod_precoCusto,registro.prod_precoVenda,
                                        registro.prod_dataValidade, registro.prod_qtdEstoque,
                                        categoria);
            listaProdutos.push(produto);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaProdutos;
    }
}