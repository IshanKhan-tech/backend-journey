import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export const register = async (email, contact, fullname , password , isSeller)=>{
    const res = await api.post("/api/auth/register",{email, contact, fullname , password , isSeller})
    return res.data
}

export const login = async (email, password)=>{
    const res = await api.post("/api/auth/login",{
        email,password
    })
    return res.data
}