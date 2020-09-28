import { GenderEnum } from "../_enums/gender-enum";

export interface RegisterUser {
    emailAddress: string;
    password: string;
    gender?: GenderEnum;
    name: string;
    surname: string;
    dateOfBirth: Date;
}