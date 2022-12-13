import { Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            clientID: '99858262102-087hjs4143ffrs6vasv9mjd2ge0l878o.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3003/api/auth/google/redirect',
            scope: ['profile', 'email']
        });
    }

    // 2. 구글 로그인 요청 이후 passport 미들웨어의 validate 메소드로 클라이언트 검증
    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log(accessToken);       // 구글 서버가 생성해서 전달해주는 accessToken
        console.log(refreshToken);      // 구글 서버가 생성해서 전달해주는 refreshToken
        console.log(profile);           // 구글 서버가 전달해주는 클라이언트의 프로필 정보

        // 3. passport 미들웨어의 validate 를 거친 후 서비스 로직
        const member = await this.authService.validateMember({ email: profile.emails[0].value, displayName: profile.displayName });

        console.log('Validate.');
        console.log(member);
        
        return member || null;
        // DB에 회원이 존재하면 member 리턴, 존재하지 않으면 DB에 회원 생성해주고 null 리턴
    }

}