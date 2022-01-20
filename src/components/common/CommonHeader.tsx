import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const CommonHeader = () => {
    return (
        <div>
            <header className="p-3 border-b border-gray-400">
                <Link to="/">
                    <FontAwesomeIcon
                        icon={faHome}
                        className="fa-lg"
                    />
                </Link>
            </header>
            <Outlet />
        </div>
    );
};

export default CommonHeader;