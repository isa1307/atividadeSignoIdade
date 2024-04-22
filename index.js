const express = require('express');

const { Pool } = require('pg');

const app = express();

app.use(express.json());

const PORT = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade2204',
    password: 'ds564',
    port: 5432,
});

function calcularIdade(data_nascimento) {
    const dataAtual = new Date();

    let idade = dataAtual.getFullYear() - data_nascimento.getFullYear();

    const mesAtual = dataAtual.getMonth();

    const mesNascimento = data_nascimento.getMonth();

    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && dataAtual.getDate() < data_nascimento.getDate())) {
        idade--;
    }
    return idade;
}

function signocalula(mes, dia) {

    if ((mes == 1 && dia >= 20) || (mes == 2 && dia <= 18)) {
        return 'Aquário ♒';
    } else if ((mes == 2 && dia >= 19) || (mes == 3 && dia <= 20)) {
        return 'Peixes ♓';
    } else if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 19)) {
        return 'Áries ♈';
    } else if ((mes == 4 && dia >= 20) || (mes == 5 && dia <= 20)) {
        return 'Touro ♉';
    } else if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) {
        return 'Gêmeos ♊';
    } else if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) {
        return 'Câncer ♋';
    } else if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) {
        return 'Leão ♌';
    } else if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) {
        return 'Virgem ♍';
    } else if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) {
        return 'Libra ♎';
    } else if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) {
        return 'Escorpião ♏';
    } else if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) {
        return 'Sagitário ♐';
    } else {
        return 'Capricórnio ♑';
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('funcionando🎊');
});

// pegar todos os usuarios
app.get('/usuarios', async (req, res) => {
    try {

        const resultado = await pool.query('SELECT * FROM usuario');

        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows,
        });

    } catch (error) {

        console.error("erro ao buscar usuarios", error);
        res.status(500).send('erro ao buscar usuarios');

    }
});

//criar usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, sobrenome, data_nascimento, email } = req.body;

        const data_Nascimento = new Date(data_nascimento);

        const idade = calcularIdade(data_Nascimento);
        const signo = signocalula(data_Nascimento.getMonth() + 1, data_Nascimento.getDate());


        await pool.query('INSERT INTO usuario (nome, sobrenome, data_nascimento, email, signo ,idade ) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, data_nascimento, email, signo, idade]);

        res.status(201).send({ mensagem: 'usuario criado com sucesso' });

    } catch (error) {

        console.error("erro ao criar usuarios", error);
        res.status(500).send('erro ao criar usuarios');

    }
});

//deletar usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM usuario WHERE id = $1', [id]);

        res.status(200).send({ mensagem: 'usuario deletado com sucesso' });

    } catch (error) {

        console.error("erro ao deletar usuarios", error);
        res.status(500).send('erro ao deletar usuarios');

    }
});

//atualizar usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, data_nascimento, email } = req.body;

        const data_Nascimento = new Date(data_nascimento);

        const idade = calcularIdade(data_Nascimento);
        const signo = signo(data_Nascimento.getMonth() + 1, data_Nascimento.getDate());


        await pool.query('UPDATE usuario SET nome = $1, sobrenome = $2, email = $3, idade = $4, signo= $5, data_nascimento = $6 WHERE id = $7', [nome, sobrenome, email, data_Nascimento, idade, signo, id]);

        res.status(200).send({ mensagem: 'usuario atualizado com sucesso' });

    } catch (error) {

        console.error("erro ao atualizar usuarios", error);
        res.status(500).send('erro ao atualizar usuarios');

    }
});

//buscar usuario pelo id
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query('SELECT nome FROM usuario WHERE id = $1', [id]);
        if (resultado.rowCount == 0) {
            res.status(404).send({ mensagem: `id ${id} não encontrado` });
            return;
        }

        res.json({
            usuarios: resultado.rows,
        });

    } catch (error) {

        console.error("erro ao buscar usuario pelo id", error);
        res.status(500).send('erro ao buscar usuario pelo id');

    }
});

// ultima coisa
app.listen(PORT, () => {
    console.log(`Server is running on 🚪 ${PORT}`);
});
