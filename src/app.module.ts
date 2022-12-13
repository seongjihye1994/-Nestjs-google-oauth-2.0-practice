import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, PassportModule.register({ session: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
