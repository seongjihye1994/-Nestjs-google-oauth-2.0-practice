import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberDetails } from "src/utils/types";
import { Repository } from "typeorm";
import { Member } from "typeorm/entities/Member";

@Injectable()
export class AuthService {

    async findMember(id: number) {
        const member = await this.memberRepository.findOneBy({ id });
        console.log(member);
        return member;
    }

    constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {

    }

    async validateMember(details: MemberDetails) {
        console.log('AuthService');
        console.log(details);

        // 3. DB 회원 조회
        const member = await this.memberRepository.findOneBy({ email: details.email });

        console.log(member);

        // DB 에서 해당 회원이 존재한다면 해당 회원 리턴
        if (member) return member;
        console.log('Member Not Found. Creating..');

        // DB 에서 해당 회원이 존재하지 않는다면 해당 회원 생성해서 DB에 insert
        const newMember = this.memberRepository.create(details);
        return this.memberRepository.save(newMember);
    }

}