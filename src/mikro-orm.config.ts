import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqliteDriver } from '@mikro-orm/sqlite';

const config: Options = {
  dbName: 'api_database.sqlite', // Or an absolute path
//   entities: [User,Post], 
//   entitiesTs: [User,Post], 
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true, // Enable for detailed logging
  driver: SqliteDriver,
};

export default config;


// export default config;
