import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WhatsUppButton = ({ variant }) => {
    const positionStyles = variant === "login"
        ? "top-[5%] right-[-0rem] " // Adjust these values for "login"
        : "top-[-30%] right-[-1rem]";  // Default values

    return (
        <div className={`absolute ${positionStyles} bg-[#5FD568] text-white p-2 rounded-full z-20 flex items-center`}>
            <Link
                to="https://wa.me/972524555290"
                target="_blank"
                className="flex items-center"
            >
                <FaWhatsapp size={34} />
            </Link>
        </div>
    )
}

export default WhatsUppButton