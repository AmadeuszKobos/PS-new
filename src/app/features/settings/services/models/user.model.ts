export interface User {
    userId: number;
    username: string;
    password: string;
    previousPassword: string;
    lastLogin: Date;
    blocked: boolean;
    personId: number;
    rightId: number;
}

export interface UserPassword {
    userId: number;
    password: string;
    previousPassword: string;
}

export interface UserRegister {
    userId: number;

    username: string;

    name: string

    phoneNumber: string;

    blocked: boolean;

    lastLogin: Date;
  }
