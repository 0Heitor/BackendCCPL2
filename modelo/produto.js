import ProdutoDAO from '../persistencia/produtoDAO';

export default class Produto{
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #dataValidade;
    #qtdEstoque;
    #categoria;

    constructor(codigo=0,descricao='',precoCusto=0,precoVenda=0,dataValidade='',qtdEstoque=0, categoria={}){
        this.#codigo = codigo;
        this.#descricao = descricao,
        this.#precoCusto = precoCusto;
        this.precoVenda = precoVenda
        this.#dataValidade = dataValidade;
        this.#qtdEstoque = qtdEstoque;
        this.#categoria = categoria;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get precoCusto(){
        return this.#precoCusto;
    }

    set precoCusto(novoCodigo){
        this.codigo = novoCodigo;
    }

    get precoVenda(){
        return this.#precoVenda;
    }

    set precoVenda(novoPrecoVenda){
      this.#precoVenda = novoPrecoVenda;
    }

    get dataValidade(){
        return this.#dataValidade;
    }

    set dataValidade(novadataValidade){
        this.#dataValidade = novadataValidade;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novoqtdEstoque){
        this.#qtdEstoque = novoqtdEstoque;
    }

    get categoria(){
        return this.#categoria;
    }

    set categoria(novaCategoria){
        this.#categoria = novaCategoria;
    }

    toJSON(){
        return{
            codigo:this.#codigo,
            descricao:this.#descricao,
            precoCusto:this.#precoCusto,
            precoVenda:this.#precoVenda,
            dataValidade:this.#dataValidade,
            qtdEstoquethis:this.#qtdEstoque,
            categoria:this.#categoria
        }
    }

    //camada de modelo acessa a camada de persistencia
     async gravar(){
        const proDAO = new ProdutoDAO();
        await proDAO.gravar(this);
    }

    async excluir(){
        const proDAO = new ProdutoDAO();
        await proDAO.excluir(this);
    }

    async alterar(){
        const proDAO = new ProdutoDAO();
        await proDAO.alterar(this);
    }

    async consultar(parametro){
        const proDAO = new ProdutoDAO();
        return await proDAO.consultar(parametro);
    }
}