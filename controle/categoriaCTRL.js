import Categoria from '../modelo/categoria.js';

export default class CategoriaCTRL{
    
    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if(descricao){
                const categoria = new Categoria(0,descricao);
                categoria.gravar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "codigoGerado":categoria.codigo,
                        "mensagem":"Categoria incluída com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao registrar a categoria: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe a descrição da categoria"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo POST para cadastrar uma categoria !"
            });
        }
    }

    alterar(requisicao, resposta){
        resposta.type("application/json");
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is('application/json')){
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const codigo = dados.codigo;
            if(codigo && descricao){
                const categoria = new Categoria(codigo, descricao);
                categoria.alterar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Categoria alterada com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao alterar a categoria: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe o codigo e a descrição da categoria"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo PUT para alterar uma categoria !"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if(codigo){
                const categoria = new Categoria(codigo, "");
                categoria.excluir().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Categoria deletado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao deletar a categoria: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe o codigo da categoria"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo DELETE para deletar uma categoria !"
            });
        }
    }

    consultar(requisicao, resposta){
        //resposta.type("application/json");
        if(requisicao.method === "GET" /*&& requisicao.is('application/json')*/){
            let termo = requisicao.params.termo;
            if(!termo){
                termo = "";
                const categoria = new Categoria();
                categoria.consultar(termo).then((listaCategorias) => {
                    resposta.status(200).json({
                        listaCategorias,
                        "status":true,
                        "mensagem":"Categoria consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar a categoria: "+erro.message
                    })
                });
            }
            else
            if(Number(!isNaN(termo))){
                const categoria = new Categoria();
                categoria.consultar(termo).then((listaCategorias) => {
                    resposta.status(200).json({
                        listaCategorias,
                        "status":true,
                        "mensagem":"Categoria consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar a categoria: "+erro.message
                    })
                });
            }
            else
            if(isNaN(termo)){
                resposta.type("application/json");
                if(requisicao.is('application/json')){
                    const dados = requisicao.body;
                    termo = dados.descricao;
                    const categoria = new Categoria();
                    categoria.consultar(termo).then((listaCategorias) => {
                        resposta.status(200).json({
                            listaCategorias,
                            "status":true,
                            "mensagem":"Categoria consultado com sucesso !"
                        })
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status":false,
                            "mensagem":"Erro ao consultar a categoria: "+erro.message
                        })
                    });
                }
                else{
                    resposta.status(400).json({
                        "status":false,
                        "mensagem":"Por favor mandar formato JSON para consultar uma categoria !"
                    });
                }
            }
        }
    }
}