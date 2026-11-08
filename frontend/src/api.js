const API = 'http://localhost:3333/clientes';

export async function listarClientes() {
    const resposta = await fetch(API);
    return resposta.json();
}

export async function cadastrarCliente(cliente) {
    const resposta = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });

    return resposta.json();
}

export async function editarCliente(id, cliente) {
    const resposta = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });

    return resposta.json();
}

export async function excluirCliente(id) {
    const resposta = await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });

    return resposta.json();
}