import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorCTRL{
    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const cnpj = dados.cnpj;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const cpf = dados.cpf;
            const rg = dados.rg;
            const email = dados.email;
            const telefone = dados.telefone;
            if(nome && cnpj && cidade && uf && endereco && numero && cpf && rg && email && telefone){
                const fornecedor = new Fornecedor(0, nome, cnpj, cidade, uf, endereco, numero, cpf, rg, email, telefone);
                fornecedor.gravar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "codigoGerado":fornecedor.codigo,
                        "mensagem":"Fornecedor incluída com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao registrar um fornecedor: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe todas as informações do fornecedor"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo POST para cadastrar um fornecedor !"
            });
        }
    }

    alterar(requisicao, resposta){
        resposta.type("application/json");
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const cnpj = dados.cnpj;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const cpf = dados.cpf;
            const rg = dados.rg;
            const email = dados.email;
            const telefone = dados.telefone;
            if(codigo && nome && cnpj && cidade && uf && endereco && numero && cpf && rg && email && telefone){
                const fornecedor = new Fornecedor(codigo, nome, cnpj, cidade, uf, endereco, numero, cpf, rg, email, telefone);
                fornecedor.alterar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Fornecedor alterada com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao alterar um fornecedor: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe todas as informações do fornecedor"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo PUT para alterar um fornecedor !"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if(codigo){
                const fornecedor = new Fornecedor(codigo, "","","","","",0,"","","","");
                fornecedor.excluir().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Fornecedor deletado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao deletar um fornecedor: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe o codigo do fornecedor"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo DELETE para deletar um fornecedor !"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "GET" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const termo = dados.nome;
            if(termo){
                const fornecedor = new Fornecedor();
                fornecedor.consultar(termo).then((listaFornecedores) => {
                    resposta.status(200).json({
                        listaFornecedores,
                        "status":true,
                        "mensagem":"Fornecedor consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar um fornecedor: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe o nome do Fornecedor"
                });
            }
        }
        else
        if(requisicao.method === "GET"){
            let termo = requisicao.params.termo;
            if(!termo){
                termo = "";
                const fornecedor = new Fornecedor();
                fornecedor.consultar(termo).then((listaFornecedores) => {
                    resposta.status(200).json({
                        listaFornecedores,
                        "status":true,
                        "mensagem":"Fornecedor consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar um fornecedor: "+erro.message
                    })
                });
            }
            else
            if(Number(!isNaN(termo))){
                const fornecedor = new Fornecedor();
                fornecedor.consultar(termo).then((listaFornecedores) => {
                    resposta.status(200).json({
                        listaFornecedores,
                        "status":true,
                        "mensagem":"Fornecedor consultado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar um fornecedor: "+erro.message
                    })
                });
            }
        }
    }
}