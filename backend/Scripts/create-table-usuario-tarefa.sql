CREATE TABLE usuario (
    id int generated always as identity,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id)
);

CREATE TABLE tarefa (
    id int generated always as identity,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(1000) NOT NULL,
    data TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Pendente', 'EmAndamento', 'Concluida')),
    usuario_id INT NOT NULL,

    CONSTRAINT pk_tarefa PRIMARY KEY (id),
    CONSTRAINT fk_tarefa_usuario FOREIGN KEY(usuario_id) REFERENCES usuario(id)
);