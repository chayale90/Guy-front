import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import AdminHomePage from '../pages/Admin/AdminHomePage';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminCreateUser from '../components/Users/AdminCreateUser';
import CreateFoodForm from '../components/Food/CreateFoodForm';
import EditFoodPage from '../pages/Admin/EditFoodPage';
import AdminLayout from './AdminLayout';
import HomePage from '../pages/User/HomePage';
import CategoryPage from '../pages/Food/CategoryPage';
import GoogleAuthHandler from '../pages/Auth/GoogleAuthHandler';
import Nav from '../components/Nav';
import Register from '../pages/Auth/Register';

const AppRoutes = () => {
    const location = useLocation();
    const shouldShowNav = location.pathname !== "/" && location.pathname !== "/signup";

    return (
        <>
            <div className="hidden lg:block md:block">
                <Nav showNav={shouldShowNav} />
            </div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/google-auth" element={<GoogleAuthHandler />} />
                <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/home/category/:categoryName" element={<PrivateRoute element={<CategoryPage />} />} />

                {/* Protected Admin Route */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route
                        index
                        element={<PrivateRoute element={<AdminHomePage />} adminOnly />}
                    />
                    <Route
                        path="users"
                        element={<PrivateRoute element={<AdminUsers />} adminOnly />}
                    />
                    <Route
                        path="createuser"
                        element={<PrivateRoute element={<AdminCreateUser />} adminOnly />}
                    />
                    <Route
                        path="createfood"
                        element={<PrivateRoute element={<CreateFoodForm />} adminOnly />}
                    />
                    <Route
                        path="editfood/:foodId"
                        element={<PrivateRoute element={<EditFoodPage />} adminOnly />}
                    />
                </Route>

                {/* Route for Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes