import logo from '@/assets/images/space/shared/logo.svg';
import { Link } from 'react-router-dom';

const SpaceLogo = () => {
    return (
        <Link
            to="/space/home"
        >
            <img
                src={logo}
                alt='spaceLogo'
                className='h-12 w-12 rounded-full'
            />
        </Link>
        // <div className='w-12 h-12 bg-red-500'>
        // </div>
    );
};

export default SpaceLogo;