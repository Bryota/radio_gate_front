import React from 'react';

export const InnerBox = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return (
        <div className='inner-box'>
            {children}
        </div>
    )
}
