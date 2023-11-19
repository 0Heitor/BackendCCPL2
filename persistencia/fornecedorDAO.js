import Fornecedor from "../modelo/fornecedor.js";
import conectar from "./conexao";

export default class FornecedorDAO{
    async gravar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const sql = "INSERT INTO fornecedor (forn_nome, forn_cnpj, forn_cidade, forn_uf, forn_endereco, forn_numero, forn_cpf, forn_rg, forn_email, forn_telefone) VALUES(?,?,?,?,?,?,?,?,?,?)";
            const parametros = [fornecedor.nome, fornecedor.cnpj, fornecedor.cidade, fornecedor.uf, fornecedor.endereco, fornecedor.numero, fornecedor.cpf, fornecedor.rg, fornecedor.email, fornecedor.telefone];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            fornecedor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(fornecedor){
        if(fornecedor instanceof Cliente){
            const sql = "UPDATE fornecedor set forn_nome = ?, forn_cnpj = ?, forn_cidade = ?, forn_uf = ?, forn_endereco = ?, forn_numero = ?, forn_cpf = ?, forn_rg = ?, forn_email = ?, forn_telefone = ? WHERE forn_codigo = ?";
            const parametros = [fornecedor.nome, fornecedor.cnpj, fornecedor.cidade, fornecedor.uf, fornecedor.endereco, fornecedor.numero, fornecedor.cpf, fornecedor.rg, fornecedor.email, fornecedor.telefone, fornecedor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const sql = "DELETE FROM fornecedor WHERE forn_codigo = ?";
            const parametros = [fornecedor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        if (!isNaN(parseInt(parametroConsulta))){
            sql='SELECT * FROM fornecedor WHERE forn_codigo = ? order by forn_nome';
            parametros = [parametroConsulta];
        }
        else{
            if(!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM fornecedor WHERE forn_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaFornecedores = [];
        for (const registro of registros){
            const fornecedor = new Fornecedor(registro.forn_codigo, registro.forn_nome, registro.forn_cnpj, registro.forn_cidade, registro.forn_uf, registro.forn_endereco, registro.forn_numero, registro.forn_cpf, registro.forn_rg, registro.forn_email, registro.forn_telefone);
            listaFornecedores.push(fornecedor);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaFornecedores;
    }
}