import logo from '@/assets/images/space/shared/logo.svg';
import { Link } from 'react-router-dom';
import { BaseProps } from '@/helpers/types';

const SpaceLogo = ({ className }: BaseProps) => {
    return (
        <Link
            to="/space/home"
            className={className}
        >
            <img
                src={logo}
                alt='spaceLogo'
                className='h-12 w-12 rounded-full'
            />
        </Link>
    );
};

export default SpaceLogo;