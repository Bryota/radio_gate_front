import React from 'react';
import "normalize.css";
import '../../../assets/css/elements/common.css';

export const AdminMainLayout = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className='bg-admin bg-full'>
            <div className='container'>
                {children}
            </div>
        </div>
    )
}
