const Pool = require('pg').Pool; 
const pool = new Pool({ 
    user: 'postgres', 
    host: 'localhost', 
    database: 'backend', 
    password: 'waitforit20', 
    dialect: 'postgres', 
    port: 5432 
}); 

const getAll = (request, response) => {
  pool.query('SELECT * FROM Employee ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEntryById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM Employee WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEntry = (request, response) => {
  const {id, last_name, first_name, is_active, date_of_birth } = request.body

  pool.query('INSERT INTO Employee (last_name, first_name, is_active, date_of_birth) VALUES ($1, $2, $3, $4)', [last_name, first_name, is_active, date_of_birth], (error, results) => {
    if (error) {
      throw error
    }
        response.status(200).send(`Employee added with ID: ${id}`)
  })
}

const updateEntry= (request, response) => {
    const id = parseInt(request.params.id)
    const { last_name, first_name, is_active, date_of_birth } = request.body

    pool.query(
    'UPDATE Employee SET last_name = $1, first_name = $2, is_active = $3, date_of_birth = $4  WHERE id = $5',
    [last_name, first_name, is_active, date_of_birth, id],
    (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`Employee modified with ID: ${id}`)
    }
    )

}

const deleteEntry = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM Employee WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Employee deleted with ID: ${id}`)
  })
}

module.exports = {
    getAll,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry,
}