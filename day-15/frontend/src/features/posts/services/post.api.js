import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/post",
    withCredentials:true
})

export const fetchFeed = async ()=>{
    const res = await api.get('/feed/getpost')
    return res.data
}