import { useEffect, useState } from 'react';
import {
    listarClientes,
    cadastrarCliente,
    editarCliente,
    excluirCliente
} from './api';
import './App.css';

function App() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idEdicao, setIdEdicao] = useState(null);

    async function carregarClientes() {
        try {
            const resposta = await listarClientes();
            setClientes(resposta.dados || []);
        } catch {
            alert('Erro ao carregar clientes.');
        }
    }

    useEffect(() => {
        carregarClientes();
    }, []);

    async function salvar(e) {
        e.preventDefault();

        const cliente = { nome, email, telefone };

        try {
            if (idEdicao === null) {
                await cadastrarCliente(cliente);
            } else {
                await editarCliente(idEdicao, cliente);
            }

            limparFormulario();
            carregarClientes();
        } catch {
            alert('Erro ao salvar cliente.');
        }
    }

    function limparFormulario() {
        setNome('');
        setEmail('');
        setTelefone('');
        setIdEdicao(null);
    }

    function editar(cliente) {
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
        setIdEdicao(cliente.id);
    }

    async function excluir(id) {
        if (!window.confirm('Deseja excluir este cliente?')) return;

        try {
            await excluirCliente(id);
            carregarClientes();
        } catch {
            alert('Erro ao excluir cliente.');
        }
    }

    return (
        <div className="container">
            <h1>Cadastro de Clientes</h1>

            <form onSubmit={salvar}>
                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    placeholder="Telefone"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    required
                />

                <button type="submit">
                    {idEdicao === null ? 'Cadastrar' : 'Salvar alterações'}
                </button>

                {idEdicao !== null && (
                    <button type="button" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </form>

            <h2>Clientes cadastrados</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button onClick={() => editar(cliente)}>
                                    Editar
                                </button>
                                <button onClick={() => excluir(cliente.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;