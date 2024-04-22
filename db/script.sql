 database: atividade2204



TABELA
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    signo VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL
);

INSERT INTO usuario (nome, sobrenome, data_nascimento, email) VALUES ('isabela','souza', '2007-02-13', 'isabela@gmail.com');
