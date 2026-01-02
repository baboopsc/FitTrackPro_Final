export declare class AuthResponseDto {
    user: {
        id: number;
        email: string;
        name: string;
        role: string;
        profileImage?: string;
    };
    access_token: string;
}
