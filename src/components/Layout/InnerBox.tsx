import React from 'react';
import '../../assets/css/components/inner_box.css'

export const InnerBox = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className='inner-box'>
            {children}
        </div>
    )
}
