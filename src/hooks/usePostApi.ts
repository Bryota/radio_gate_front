import axios from '../settings/Axios';
import { useState, useCallback } from "react";

import { ApiResponseType } from '../types/common';

export const usePostApi = (url: string, payload: {}) => {
    const [response, setResponse] = useState<ApiResponseType>({ data: {}, status: undefined });

    const postApi = useCallback(() => {
        axios.post(url, payload)
            .then(res => {
                setResponse(() => ({ data: res.data, status: res.status }));
            })
            .catch(res => {
                setResponse(() => ({ data: res.response.data, status: res.response.status }));
            })
    }, [url, payload])

    return { response, postApi };
}
