import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"




const WelcomeUser = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            if (decoded.firstName) {
                setUserName(decoded.firstName);
            }
        } catch (err) {
            console.error('שגיאה בפענוח הטוקן:', err);
        }
    }, []);

    if (!userName) return null;


    return (
        <div className='lg:flex lg:items-center lg:justify-center lg:text-center md:flex md:items-center md:justify-center md:text-center'>
            <h1 className='text-[22px] lg:text-[25px] md:text-[25px] text-custom-blue break-words font-bold lg:mr-2'>
                היי {userName && userName}
            </h1>
            <p className='text-black text-[22px] lg:text-[25px] md:text-[25px] break-words lg:mr-2 md:mr-2' style={{ fontWeight: 400 }}>
                מה ברצונך לאכול היום?
            </p>
        </div>
    )
}

export default WelcomeUser