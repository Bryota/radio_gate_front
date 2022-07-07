import axios from '../settings/Axios';
import { useState, useCallback } from "react";

import { ApiResponseType } from '../types/common';

export const usePostApi = (url: string, payload: {}) => {
    const [response, setResponse] = useState<ApiResponseType>({ data: {}, status: undefined });

    const postApi = useCallback(() => {
        axios.post(url, payload)
            .then(res => {
                console.log(res)
                setResponse({ data: res.data, status: res.status })
            })
    }, [url, payload])

    return { response, postApi };
}
