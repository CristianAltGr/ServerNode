import { USER_BD } from "../bd.js";

export function authUser(mail, password) {
    return USER_BD.find(user => user.email == mail && user.password == password);
}