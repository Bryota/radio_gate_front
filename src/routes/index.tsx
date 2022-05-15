import { useRoutes } from 'react-router-dom';

import { Top } from '../features/top';

export const AppRoutes = () => {
    const commonRoutes = [{ path: '/', element: <Top /> }]

    const element = useRoutes([...commonRoutes]);

    return <>{element}</>
}
