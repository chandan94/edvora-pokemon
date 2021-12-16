export interface LogInResponse {
    exists: boolean,
    user?: User
}

export interface User {
    email: string,
    password: string,
}