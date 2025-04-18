import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-lg">Sorry, the page you are looking for does not exist.</p>
            <Link to="/home" className="mt-6 text-blue-500">
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
