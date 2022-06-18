import axios from '../../settings/Axios';

export const isAuthorized = async () => {
    try {
        const authorizedResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/authorized`);
        if (authorizedResponse.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}
