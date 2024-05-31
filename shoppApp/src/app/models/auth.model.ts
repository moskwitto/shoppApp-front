export interface LoginRequest {
    email: string, // No longer optional
    password: string
}

export interface JwtResponse {
    access_token: string,
    token_type: string,
    expires_in: number
}
