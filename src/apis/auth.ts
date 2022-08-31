import axios from 'axios';
import { Register } from '~/layouts/components/Auth/interface';
export const vietNamProvinces = async () => {
    try {
        const result = await axios.get('https://provinces.open-api.vn/api/?depth=1');
        return result.data;
    } catch (err) {
        console.log(err);
    }
};

export const requestRegister = async (data: Register) => {
    try {
        const api = 'http://localhost:8000/api/auth/signup';
        const res = await axios.post(api, data);
        return res;
    } catch (err) {
        console.log('Error: ', err);
        return err;
    }
};
