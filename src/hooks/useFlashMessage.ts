import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useFlashMessage = () => {
    const location = useLocation();
    const [locationParams, setLocationParams] = useState<{ flash_message: string }>(location.state as { flash_message: string });
    const navigation = useNavigate();
    if (location.state) {
        navigation(location.pathname, { state: null });
    }
    if (locationParams) {
        return locationParams.flash_message;
    } else {
        return null;
    }
}
