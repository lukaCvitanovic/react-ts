import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h1 className="bold-medium text-lg">Main page</h1>
            <div className="flex flex-col px-4">
                <Link to="todo">ToDo</Link>
            </div>
        </div>
    );
};

export default Main;