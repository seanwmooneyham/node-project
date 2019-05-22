const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'test_app_user',
    host: 'localhost',
    database: 'api',
    password: 'password123',
    port: 5432
});

// REST endpoints

/*
* Purpose: GET all users
* PATH:  /users
*/
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
};

/*
* Purpose: GET user by id
* PATH:  /users/:id
*/
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
};

/*
* Purpose: POST a new user
* PATH:  /users
*/
const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if(error) {
            throw error;
        }
        response.status(201).send('User added with ID: ${result.insertID}');
    })
};

/*
* Purpose: PUT update existing user
* PATH:  /users/:id
*/
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const {name, email} = request.body;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id],
    (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).send('User modified with ID: ${id}');
    });
};

/*
* Purpose: DELETE user
* PATH:  /users/:id
*/
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).send('User deleted with ID: ${id');
    });
};

// Export API endpoints
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};