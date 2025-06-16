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
// import GoogleAuthHandler from '../pages/Auth/GoogleAuthHandler';
import Register from '../pages/Auth/Register';
import ProfilePage from '../pages/User/ProfilePage';
import Nav from '../components/Layout/Nav';

const AppRoutes = () => {
    const location = useLocation();
    const shouldShowNav = location.pathname !== "/" && location.pathname !== "/signup";

    return (
        <>
            <div className="hidden lg:block md:block">
                <Nav showNav={shouldShowNav} />
            </div>
            <Routes>
                {/* Auth Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/* User Routes - הוספתי clientOnly */}
                <Route path="/home" element={<PrivateRoute element={<HomePage />} clientOnly />} />
                <Route path="/home/category/:categoryName" element={<PrivateRoute element={<CategoryPage />} clientOnly />} />
                <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} clientOnly />} />

                {/* Protected Admin Route */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<PrivateRoute element={<AdminHomePage />} adminOnly />} />
                    <Route path="users" element={<PrivateRoute element={<AdminUsers />} adminOnly />} />
                    <Route path="createuser" element={<PrivateRoute element={<AdminCreateUser />} adminOnly />} />
                    <Route path="createfood" element={<PrivateRoute element={<CreateFoodForm />} adminOnly />} />
                    <Route path="editfood/:foodId" element={<PrivateRoute element={<EditFoodPage />} adminOnly />} />
                </Route>

                {/* Catch-All 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes