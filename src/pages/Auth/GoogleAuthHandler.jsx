// import { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';


// const GoogleAuthHandler = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const user = JSON.parse(decodeURIComponent(params.get('user')));
//         const token = params.get('token');

//         if (user && token) {
//             if (user.isActive) {
//                 localStorage.setItem('user', JSON.stringify({ ...user, token }));
//                 navigate('/home');
//             } else {
//                 // Redirect if the user is inactive
//                 navigate('/');
//             }
//         } else {
//             navigate('/');
//         }
//     }, [location, navigate]);

//     return (
//         <div>
//             Authenticating... Please wait...
//         </div>
//     )
// };
// export default GoogleAuthHandler;