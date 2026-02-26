// Provide a safe browser-friendly fallback for database queries.
// The official Neon serverless client is intended for server-side use only
// and can break when bundled for the browser. To avoid a blank page due
// to import/runtime errors, export a no-op tagged template function that
// resolves to an empty array in the browser/dev client.

const connectionString = import.meta.env.VITE_NEON_DATABASE_URL;

if (!connectionString) {
    // Inform developers when the env var is missing, but don't throw in the browser.
    // The console message is safe both in dev and production.
    console.error('VITE_NEON_DATABASE_URL is not defined in .env');
}

// Tagged template fallback: throw to ensure caller's try/catch uses local fallback.
async function sql() {
    throw new Error('Neon DB unavailable in the browser');
}

sql.raw = sql;

export default sql;
