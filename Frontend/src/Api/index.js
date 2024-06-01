import axios from 'axios';
import { BASE_URL } from '../Constants';

export const validateUser = async(token) =>{
    const res = await axios.post(`${BASE_URL}api/users/login`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}