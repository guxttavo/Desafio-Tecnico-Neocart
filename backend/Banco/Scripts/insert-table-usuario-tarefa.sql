INSERT INTO usuario (nome, email, senha)
VALUES
('Usuario Teste 1', 'usuario.teste1@email.com', '123'),
('Usuario Teste 2', 'usuario.teste2@email.com', '123');

INSERT INTO tarefa (nome, descricao, data, status, usuario_id)
VALUES
('Tarefa 1', 'Descrição da tarefa 1', '2025-02-03 14:00:00', 'Concluida', 1),
('Tarefa 2', 'Descrição da tarefa 1', '2025-02-03 16:00:00', 'Pendente', 2);