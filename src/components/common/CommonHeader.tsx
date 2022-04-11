import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const CommonHeader = () => {
    return (
        <div className="h-screen">
            <header className="p-3 border-b border-gray-400">
                <Link to="/">
                    <FontAwesomeIcon
                        icon={faHome as IconProp}
                        className="fa-lg"
                    />
                </Link>
            </header>
            <Outlet />
        </div>
    );
};

export default CommonHeader;