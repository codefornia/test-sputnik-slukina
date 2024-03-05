export type UsersResponse = {
    total: number;
    users: User[];
    hasError: boolean;
}

export type UserResponse = {
    user: User | null;
    hasError: boolean;
}

export type User = {
    id: number;
    age: number;
    firstName: string;
    lastName: string;
    username: string;
}

export type UserModify = {
    firstName: string;
    lastName: string;
    username: string;
    age: number;
}