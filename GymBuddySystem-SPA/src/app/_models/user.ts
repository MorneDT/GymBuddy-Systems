export interface User {
    id: number;
    username: string;
    gender?: string;
    age: number;
    fullName: string;
    created: Date;
    weight?: number;
}