import { DataSource } from "typeorm";

import { entities } from "../entities";

import { CONNECTION_STRING } from "../constants";

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: CONNECTION_STRING,
  synchronize: true,
  logging: false,
  entities,
  subscribers: [],
  migrations: [],
});
