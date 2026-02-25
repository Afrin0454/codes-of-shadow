import { neon } from '@neondatabase/serverless';

const connectionString = import.meta.env.VITE_NEON_DATABASE_URL;

if (!connectionString) {
    console.error('VITE_NEON_DATABASE_URL is not defined in .env');
}

const sql = neon(connectionString);

export default sql;
