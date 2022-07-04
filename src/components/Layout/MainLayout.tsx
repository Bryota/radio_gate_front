import React from 'react';
import { Navbar } from './Navbar';
import "normalize.css";
import '../../assets/css/elements/common.css';

export const MainLayout = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className='bg-base bg-full d-flex'>
            <Navbar />
            <div className='container'>
                {children}
            </div>
        </div>
    )
}
