import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super();
    }

    serializeUser(member: any, done: Function) {
        console.log('SerializeUser');
        done(null, member);
    }

    async deserializeUser(payload: any, done: Function) {
        const member = await this.authService.findMember(payload.id);
        console.log('DeserializeUser');
        console.log(member);
        
        return member ? done(null, member) : done(null, null);
    }
}