import FornecedorDAO from '../persistencia/fornecedorDAO.js';

export default class Fornecedor{
    #codigo
    #nome
    #cnpj
    #cidade
    #uf
    #endereco
    #numero
    #cpf
    #rg
    #email
    #telefone

    constructor(codigo=0, nome="", cnpj="", cidade="", uf="", endereco="", numero=0, cpf="", rg="", email="", telefone=""){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#cnpj=cnpj;
        this.#cidade=cidade;
        this.#uf=uf;
        this.#endereco=endereco;
        this.#numero=numero;
        this.#cpf=cpf;
        this.#rg=rg;
        this.#email=email;
        this.#telefone=telefone;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get cnpj(){
        return this.#cnpj;
    }

    set cnpj(novoCnpj){
        this.#cnpj = novoCnpj;
    }
    
    get cidade(){
        return this.#cidade;
    }

    set cidade(novoCidade){
        this.#cidade = novoCidade;
    } 
    
    get uf(){
        return this.#uf;
    }

    set uf(novoUf){
        this.#uf = novoUf;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get rg(){
        return this.#rg;
    }

    set rg(novoRg){
        this.#rg = novoRg;
    }
    
    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            cnpj:this.#cnpj,
            cidade:this.#cidade,
            uf:this.#uf,
            endereco:this.#endereco,
            numero:this.#numero,
            cpf:this.#cpf,
            rg:this.#rg,
            email:this.#email,
            telefone:this.#telefone
        }
    }

    async gravar(){
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.gravar(this);
    }
 
    async excluir(){
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }
 
    async alterar(){
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.atualizar(this);
    }
 
    async consultar(termo){
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(termo);
    }
}