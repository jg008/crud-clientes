const conexao = require('../database/connection');

async function listar(req, res) {
    try {
        const [clientes] = await conexao.query('SELECT * FROM clientes_aula');
        res.json({ dados: clientes });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao listar clientes.' });
    }
}

async function inserir(req, res) {
    try {
        const { nome, email, telefone } = req.body;

        const [resultado] = await conexao.query(
            'INSERT INTO clientes_aula (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone]
        );

        res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso.',
            id: resultado.insertId
        });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar cliente.' });
    }
}

async function atualizar(req, res) {
    try {
        const { nome, email, telefone } = req.body;
        const { id } = req.params;

        const [resultado] = await conexao.query(
            'UPDATE clientes_aula SET nome = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, email, telefone, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        res.json({ mensagem: 'Cliente atualizado com sucesso.' });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao atualizar cliente.' });
    }
}

async function excluir(req, res) {
    try {
        const { id } = req.params;

        const [resultado] = await conexao.query(
            'DELETE FROM clientes_aula WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        res.json({ mensagem: 'Cliente excluído com sucesso.' });
    } catch (erro) {
    console.log(erro);
    res.status(500).json({ mensagem: 'Erro ao listar clientes.' });
}
}

module.exports = { listar, inserir, atualizar, excluir };