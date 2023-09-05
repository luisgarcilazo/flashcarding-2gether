import {Role} from "./Role"

export interface User {
    username: string,
    password?: string,
    email?: string,
    roles?: Role[],
}