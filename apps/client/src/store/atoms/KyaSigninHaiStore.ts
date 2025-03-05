import { atom } from "recoil";

export const tokenAtom =atom({
    key:'token-auth',
    default:localStorage.getItem('token')
})
