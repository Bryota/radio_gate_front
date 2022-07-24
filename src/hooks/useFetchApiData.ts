import axios from '../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { isAuthorized } from '../modules/auth/isAuthorized';

export const useFetchApiData = <T>(url: string, currentPage: number = 1) => {
    const [apiData, setApiData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigate();

    const fetchApiData = async () => {
        try {
            if (!await isAuthorized()) { return navigation('/login'); }

            const response = await axios.get(url);
            setApiData(response.data);

            setIsLoading(false);
        } catch (err: any) {
            console.log(err);
            if (err.response.status === 404) { return navigation('/not_fount'); }
            return navigation('/server_error');
        }
    }

    return { apiData, isLoading, fetchApiData }
}
