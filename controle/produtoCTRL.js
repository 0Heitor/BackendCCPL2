import Produto from '../modelo/produto.js';
import Categoria from '../modelo/categoria.js';

export default class ProdutoCTRL{
    
    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            const cat = dados.categoria;
            if(descricao && precoCusto > 0 && precoVenda > 0 && dataValidade && qtdEstoque >=0 && cat >=0){
                const categoria = new Categoria(cat,"");
                const produto = new Produto(0,descricao,precoCusto,precoVenda,dataValidade,qtdEstoque,categoria);
                produto.gravar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "codigoGerado":produto.codigo,
                        "mensagem":"Produto incluída com sucesso !"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao registrar o produto: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe as informações(descricao, preços de Custo e Venda, Data da Validade, quantidade do estoque, e o Objeto da categoria(codigo e descrição)) do produto"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo POST para cadastrar um produto !"
            });
        }
    }

    alterar(requisicao, resposta){
        resposta.type("application/json");
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            const cat = dados.categoria;
            if(codigo && descricao && precoCusto > 0 && precoVenda > 0 && dataValidade && qtdEstoque >=0 && cat >=0){
                const categoria = new Categoria(cat,"");
                const produto = new Produto(codigo,descricao,precoCusto,precoVenda,dataValidade,qtdEstoque,categoria);
                produto.alterar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Produto alterado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao alterar o produto: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe as informações(codigo, descricao, preços de Custo e Venda, Data da Validade, quantidade do estoque, e o Objeto da categoria(codigo e descrição)) do produto"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo PUT para alterar um produto !"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if(codigo){
                const produto = new Produto(codigo, "",0,0,"",0,{});
                produto.excluir().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Produto deletado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao deletar o produto: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe o codigo do produto"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo DELETE para deletar um produto !"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "GET" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const termo = dados.descricao;
            if(termo){
                const produto = new Produto();
                produto.consultar(termo).then((listaProdutos) => {
                    resposta.status(200).json({
                        listaProdutos,
                        "status":true,
                        "mensagem":"Produto consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar um produto: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe a descricao do produto"
                });
            }
        }
        else
        if(requisicao.method === "GET"){
            let termo = requisicao.params.termo;
            if(!termo){
                termo = "";
                const produto = new Produto();
                produto.consultar(termo).then((listaProdutos) => {
                    resposta.status(200).json({
                        listaProdutos,
                        "status":true,
                        "mensagem":"Produto consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar um produto: "+erro.message
                    })
                });
            }
            else
            if(Number(!isNaN(termo))){
                const produto = new Produto();
                produto.consultar(termo).then((listaProdutos) => {
                    resposta.status(200).json({
                        listaProdutos,
                        "status":true,
                        "mensagem":"Produto consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar um produto: "+erro.message
                    })
                });
            }
        }
    }
}