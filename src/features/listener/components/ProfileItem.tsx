import { ProfileItemType } from '../../../types/listener';

import '../../../assets/css/elements/listener.css';

export const ProfileItem = ({ label, value, is_first_item = false, no_value = false }: ProfileItemType): JSX.Element => {
    return (
        <>
            <div className={is_first_item ? 'row mt-0 font-25 underline-green' : 'row mt-5 font-25 underline-green'}>
                <div className='col-4'>
                    {label}
                </div>
                <div className={no_value ? 'col-8 color-accent' : 'col-8'}>
                    {value}
                </div>
            </div>
        </>
    )
}
