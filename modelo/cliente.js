import ClienteDAO from '../persistencia/clienteDAO.js';

export default class Cliente{
    #codigo
    #cpf
    #nome
    #endereco
    #numero
    #bairro
    #cidade
    #uf
    #cep

    constructor(codigo=0, cpf="", nome="", endereco="", numero=0, bairro="", cidade="", uf="", cep=""){
        this.#codigo=codigo;
        this.#cpf=cpf;
        this.#nome=nome;
        this.#endereco=endereco;
        this.#numero=numero;
        this.#bairro=bairro;
        this.#cidade=cidade;
        this.#uf=uf;
        this.#cep=cep;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
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

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
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
    
    get cep(){
        return this.#cep;
    }

    set cep(novoCep){
        this.#cep = novoCep;
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            cpf:this.#cpf,
            nome:this.#nome,
            endereco:this.#endereco,
            numero:this.#numero,
            bairro:this.#bairro,
            cidade:this.#cidade,
            uf:this.#uf,
            cep:this.#cep
        }
    }

    async gravar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }
 
    async excluir(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }
 
    async alterar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.atualizar(this);
    }
 
    async consultar(termo){
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }
}