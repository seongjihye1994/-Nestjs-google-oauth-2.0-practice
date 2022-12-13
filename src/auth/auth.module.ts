import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'typeorm/entities/Member';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/google-strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
    controllers: [AuthController], // 라우터 등록
    providers: [GoogleStrategy, SessionSerializer,
    {
        provide: 'AUTH_SERVICE',
        useClass: AuthService,
    }],
    imports: 
    [TypeOrmModule.forFeature([Member])],
})
export class AuthModule {}
