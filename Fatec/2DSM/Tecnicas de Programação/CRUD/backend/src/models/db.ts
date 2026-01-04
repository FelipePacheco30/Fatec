import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usuarios',
    password: '123',
    port: 5432, // verifique a porta correta do seu banco de dados
});

async function query(sql: string, params?: any[]) {
    try {
        const res = await pool.query(sql, params);
        if (res.command == 'INSERT') {
            return res.rows[0];
        }
        else if (res.command == 'SELECT') {
            return res.rows;
        }
        else if (res.command == 'DELETE' || res.command == 'UPDATE') {
            return { rowcount: res.rowCount };
        }
        else {
            return { sql };
        }
    }
    catch (e: any) {
        return { message: e.message };
    }
};
export default query;