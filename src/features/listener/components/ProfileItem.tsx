import '../../../assets/css/elements/listener.css';

type ProfileItemType = {
    label: string
    value: string
    is_first_item?: boolean
    no_value?: boolean
}

export const ProfileItem = ({ label, value, is_first_item = false, no_value = false }: ProfileItemType): JSX.Element => {
    return (
        <>
            <div className={is_first_item ? 'profile-item row mt-0' : 'profile-item row'}>
                <div className='col-4 profile-item-label'>
                    {label}
                </div>
                <div className={no_value ? 'col-8 profile-item-value no-value' : 'col-8 profile-item-value'}>
                    {value}
                </div>
            </div>
        </>
    )
}
