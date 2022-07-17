import axios from '../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { isAuthorized } from '../modules/auth/isAuthorized';

export const useFetchApiData = <T>(url: string, currentPage: number = 1) => {
    const [apiData, setApiData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                if (!await isAuthorized()) { return navigation('/login'); }

                const response = await axios.get(url);
                setApiData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                return navigation('/not_fount');
            }
        }
        fetchApiData();
    }, [currentPage]);

    return { apiData, isLoading }
}
