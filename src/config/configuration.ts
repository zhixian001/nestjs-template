export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    postgres: {
      host: process.env.DATABASE_HOST ?? process.env.PGHOST ?? 'localhost',
      port:
        parseInt(process.env.DATABASE_PORT, 10) ||
        parseInt(process.env.PGPORT, 10) ||
        5432,
      database: process.env.DATABASE_DATABASE ?? process.env.PGDATABASE,
      user: process.env.DATABASE_USER || process.env.PGUSER || 'postgres',
      password:
        process.env.DATABASE_PASSWORD || process.env.PGPASSWORD || 'postgres',
    } as DatabaseConfig,
    sqlite: {
      database:
        process.env.SQLITE_DATABASE ??
        process.env.DATABASE_DATABASE ??
        './database.db',
    } as DatabaseConfig,
  } as Record<string, DatabaseConfig>,
});
