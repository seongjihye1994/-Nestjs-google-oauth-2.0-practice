import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Member } from 'typeorm/entities/Member';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [Member], // 이 엔티티 파일로 DB 테이블 생성해줌. 그 경로를 적어줌
  synchronize: dbConfig.synchronize,
};
