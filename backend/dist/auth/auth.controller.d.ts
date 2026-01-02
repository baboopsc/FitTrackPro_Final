import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<any>;
    login(dto: LoginDto): Promise<any>;
    test(req: any): {
        message: string;
        user: any;
    };
}
