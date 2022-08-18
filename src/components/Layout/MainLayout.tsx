import React from 'react';
import { Navbar } from './Navbar';
import { NavbarResponsive } from './NavbarResponsive'
import "normalize.css";
import '../../assets/css/elements/common.css';

export const MainLayout = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className='bg-base bg-full d-flex'>
            <Navbar />
            <NavbarResponsive />
            <div className='container pb-5 pb-lg-0 mb-4 mb-lg-0'>
                {children}
            </div>
        </div>
    )
}
