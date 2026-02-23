import {Pool} from 'pg';

const pool =  new Pool({
    user: "postgres",
    host: 'localhost',
    database: 'absensi_db',
    password: 'postgres',
    port: 5432,
})

export default pool;