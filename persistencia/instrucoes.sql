CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria(
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
    CONSTRAINT fk_categoria FOREIGN KEY(cat_codigo) REFERENCES categoria(cat_codigo)
);

CREATE TABLE cliente(
    cli_codigo INT NOT NULL AUTO_INCREMENT,
    cli_cpf VARCHAR(14) NOT NULL,
    cli_nome VARCHAR(100) NOT NULL,
    cli_endereco VARCHAR(100) NOT NULL,
    cli_numero INT NOT NULL,
    cli_bairro VARCHAR(100) NOT NULL,
    cli_cidade VARCHAR(100) NOT NULL,
    cli_uf VARCHAR(2) NOT NULL,
    cli_cep VARCHAR(20) NOT NULL,
    CONSTRAINT cli_cliente PRIMARY KEY(cli_codigo)
);

CREATE TABLE fornecedor(
    forn_codigo INT NOT NULL AUTO_INCREMENT,
    forn_nome VARCHAR(100) NOT NULL,
    forn_cnpj VARCHAR(100) NOT NULL,
    forn_cidade VARCHAR(100) NOT NULL,
    forn_uf VARCHAR(2) NOT NULL,
    forn_endereco VARCHAR(100) NOT NULL,
    forn_numero INT NOT NULL,
    forn_cpf VARCHAR(14) NOT NULL,
    forn_rg VARCHAR(100) NOT NULL,
    forn_email VARCHAR(100) NOT NULL,
    forn_telefone VARCHAR(100) NOT NULL,
    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
);