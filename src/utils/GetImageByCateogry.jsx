import vegetablesImage from '../../public/images/vegetables.webp';
import cerealsImage from '../../public/images/cereals.webp';
import snackingImage from '../../public/images/snacking.webp';
import oilImage from '../../public/images/oil.webp';
import fruitsImage from '../../public/images/fruits.webp';
import meatImage from '../../public/images/meat.webp';
import milkImage from '../../public/images/milk.webp';
import logo from '../../public/images/גיא לוי עם כל תיקוני הצבע לוגו.png';


const imagesToPreload = [
    vegetablesImage,
    cerealsImage,
    snackingImage,
    oilImage,
    fruitsImage,
    meatImage,
    milkImage,
    logo
];

export const checkCategory = (categoryName) => {
    switch (categoryName) {
        case 'ירקות': return vegetablesImage;
        case 'דגנים וקטניות': return cerealsImage;
        case 'חלב מוצריו ותחליפיו': return milkImage;
        case 'נשנושים': return snackingImage;
        case 'פירות': return fruitsImage;
        case 'עוף בשר דגים ותחליפי חלבון מן הצומח': return meatImage;
        case 'שומנים': return oilImage;
        default: return logo;
    }
};

export const preloadImages = () => {
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};



