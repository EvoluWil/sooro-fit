import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders: DataSourceOptions = {
  type: 'sqlite',
  database: 'src/providers/database/database.sqlite',
  entities: ['dist/**/entities/*.js'],
  migrations: ['dist/**/migrations/*.js'],
  synchronize: false,
};

export const dataSource = new DataSource(databaseProviders);
