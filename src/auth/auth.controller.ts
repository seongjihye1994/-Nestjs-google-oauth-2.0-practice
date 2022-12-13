import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./utils/Guards";

@Controller('auth')
export class AuthController {

    // api/auth/google/login -> 1. 구글 로그인 요청 api
    @Get('google/login')
    @UseGuards(GoogleAuthGuard) // ***** UseGuards 데코레이터를 사용해야지만 passport 미들웨어(구글 로그인)를 거칠 수 있음 -> 이거 없으면 아래 로그 찍히고 msg 리턴함
    handleLogin() {
        console.log('handleLogin');
        return { msg: 'Google Authentication'}
    }

    // passport 의 validate와 서비스 로직 모두 거친 후 아래 로직 탐

    // api/auth/google/redirect -> 5. 구글 로그인 요청 이후 결과에 따른 redirect api
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        console.log('handleRedirect');
        return { msg: 'OK' };
    }
} 