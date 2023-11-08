const { Pool } = require('pg');
const { v4: uuid } = require('uuid');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

exports.create = (temp) => {
    return pool.query(
        'INSERT INTO weather (weather_id, output_scale, output_temp, date_of_entry) VALUES ($1, $2, $3, $4) RETURNING *',
        [uuid(), 'K', temp, new Date()]
    )
}

exports.read = () => {
    return pool.query(
        'SELECT * FROM weather'
    )
}

exports.update = (id, newTemp) => {
    return pool.query(
        'UPDATE weather SET output_temp = $1 WHERE weather_id = $2',
        [newTemp, id]
    )
}

exports.deleteWeather = (id) => {
    return pool.query(
        'DELETE FROM weather WHERE weather_id = $1',
        [id]
    )
}