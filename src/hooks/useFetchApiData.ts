import axios from '../settings/Axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { isAuthorized } from '../modules/auth/isAuthorized';

export const useFetchApiData = <T>(url: string, currentPage: number = 1) => {
    const [apiData, setApiData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigate();

    useEffect(() => {
        authorized();
        const fetchApiData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response);
                setApiData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchApiData();
    }, [currentPage]);


    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }
    return { apiData, isLoading }
}
