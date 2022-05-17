import React from 'react';
import "normalize.css";

export const MainLayout = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className='bg-base bg-full'>
            <div className='container'>
                {children}
            </div>
        </div>
    )
}
