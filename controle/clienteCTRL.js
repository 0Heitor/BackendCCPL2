import Cliente from '../modelo/cliente.js';

export default class ClienteCTRL{
    
    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            if(cpf && nome && endereco && numero && bairro && cidade && uf && cep){
                const cliente = new Cliente(0, cpf, nome, endereco, numero, bairro, cidade, uf, cep);
                cliente.gravar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "codigoGerado":cliente.codigo,
                        "mensagem":"Cliente incluída com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao registrar um cliente: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe as informações compleatas do Cliente"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo POST para cadastrar um Cliente !"
            });
        }
    }

    alterar(requisicao, resposta){
        resposta.type("application/json");
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            if(codigo && cpf && nome && endereco && numero && bairro && cidade && uf && cep){
                const cliente = new Cliente(codigo, cpf, nome, endereco, numero, bairro, cidade, uf, cep);
                cliente.alterar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Categoria alterada com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao alterar um cliente: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe todas as informações do Cliente"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo PUT para alterar um Cliente !"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if(codigo){
                const cliente = new Cliente(codigo, "", "", "", 0, "", "", "", "");
                cliente.excluir().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Cliente deletado com sucesso !"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao deletar um cliente: "+erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status":false,
                    "mensagem":"Por favor informe o codigo do Cliente"
                });
            }  
        }
        else{
            resposta.status(400).json({
                "status":false,
                "mensagem":"Por favor informe o metodo DELETE para deletar um Cliente !"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "GET" && requisicao.is('application/json')){
            const termo = requisicao.params.termo;
            if(!termo)
                termo = "";
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaClientes) => {
                resposta.status(200).json({
                    listaClientes,
                    "status":true,
                    "mensagem":"Cliente consultado com sucesso !"
                })
            }).catch((erro) => {
                resposta.status(500).json({
                    "status":false,
                    "mensagem":"Erro ao consultar o cliente: "+erro.message
                })
            });
        }
    }
}