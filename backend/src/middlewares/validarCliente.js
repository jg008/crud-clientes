function validarCliente(req, res, next) {
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos.'
        });
    }

    if (nome.length > 100 || email.length > 150 || telefone.length > 20) {
        return res.status(400).json({
            mensagem: 'Um ou mais campos ultrapassaram o limite de caracteres.'
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            mensagem: 'E-mail inválido.'
        });
    }

    next();
}

module.exports = validarCliente;