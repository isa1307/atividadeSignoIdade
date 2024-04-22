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

function calculaidade(data_nascimento) {
    const dataAtual = new Date();
    const dataNascimento = new Date(data_nascimento);

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

    if (dataAtual.getMonth() < dataNascimento.getMonth() || dataAtual.getMonth() == dataNascimento.getMonth() && dataAtual.getDate() < dataNascimento.getDate()) {
        idade--;
    }

    return idade;
}

function signocalula(data_nascimento, dataAtual) {
    if(data_nascimento == 1 && dataAtual >= 20 || data_nascimento == 2 && dataAtual <= 18){
        return 'Aquário♒';
    }
    if(data_nascimento == 2 && dataAtual >= 19 || data_nascimento == 3 && dataAtual <= 20){
        return 'Peixes♓';
    }
    if(data_nascimento == 3 && dataAtual >= 21 || data_nascimento == 4 && dataAtual <= 19){
        return 'Áries♈';
    }
    if(data_nascimento == 4 && dataAtual >= 20 || data_nascimento == 5 && dataAtual <= 20){
        return 'Touro♉';
    }
    if(data_nascimento == 5 && dataAtual >= 21 || data_nascimento == 6 && dataAtual <= 21){
        return 'Gêmeos♊';
    }
    if(data_nascimento == 6 && dataAtual >= 22 || data_nascimento == 7 && dataAtual <= 22){
        return 'Câncer♋';
    }
    if(data_nascimento == 7 && dataAtual >= 23 || data_nascimento == 8 && dataAtual <= 22){
        return 'Leão♌';
    }
    if(data_nascimento == 8 && dataAtual >= 23 || data_nascimento == 9 && dataAtual <= 22){
        return 'Virgem♍';
    }
    if(data_nascimento == 9 && dataAtual >= 23 || data_nascimento == 10 && dataAtual <= 22){
        return 'Libra♎';
    }
    if(data_nascimento == 10 && dataAtual >= 23 || data_nascimento == 11 && dataAtual <= 21){
        return 'Escorpião♏';
    }
    if(data_nascimento == 11 && dataAtual >= 22 || data_nascimento == 12 && dataAtual <= 21){
        return 'Sagitário♐';
    }
    if(data_nascimento == 12 && dataAtual >= 22 || data_nascimento == 1 && dataAtual <= 19){
        return 'Capricórnio♑';
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

        const idade = calculaidade(data_Nascimento);
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
