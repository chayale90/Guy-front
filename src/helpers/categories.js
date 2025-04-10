import vegetablesImage from '/images/vegetables.webp';
import cerealsImage from '/images/cereals.webp';
import snackingImage from '/images/snacking.webp';
import oilImage from '/images/oil.webp';
import fruitsImage from '/images/fruits.webp';
import meatImage from '/images/meat.webp';
import milkImage from '/images/milk.webp';
import logo from '/images/guy_levi_logo.webp';


const categories = [
    { category: 'חלב מוצריו ותחליפיו', id: 1 },
    { category: 'דגנים וקטניות', id: 2 },
    { category: 'עוף בשר דגים ותחליפי חלבון מן הצומח', id: 3 },
    { category: 'שומנים', id: 4 },
    { category: 'ירקות', id: 5 },
    { category: 'פירות', id: 6 },
    { category: 'נשנושים', id: 7 },
];

const categoryImages = {
    'ירקות': vegetablesImage,
    'דגנים וקטניות': cerealsImage,
    'חלב מוצריו ותחליפיו': milkImage,
    'נשנושים': snackingImage,
    'פירות': fruitsImage,
    'עוף בשר דגים ותחליפי חלבון מן הצומח': meatImage,
    'שומנים': oilImage,
};

export const mappedCategories = categories.map(category => ({
    ...category,
    image: categoryImages[category.category] || logo, // תמונה ברירת מחדל במקרה ואין תמונה
}));


// const categories = [
//     { category: 'חלב מוצריו ותחליפיו', id: 1 },
//     { category: 'דגנים וקטניות', id: 2 },
//     { category: 'עוף בשר דגים ותחליפי חלבון מן הצומח', id: 3 },
//     { category: 'שומנים', id: 4 },
//     { category: 'ירקות', id: 5 },
//     { category: 'פירות', id: 6 },
//     { category: 'נשנושים', id: 7 },
// ];

// const categoryImages = {
//     'ירקות': vegetablesImage,
//     'דגנים וקטניות': cerealsImage,
//     'חלב מוצריו ותחליפיו': milkImage,
//     'נשנושים': snackingImage,
//     'פירות': fruitsImage,
//     'עוף בשר דגים ותחליפי חלבון מן הצומח': meatImage,
//     'שומנים': oilImage,
// };

// export const sortedCategories = categories
//     .sort((a, b) => a.id - b.id)
//     .map(category => ({
//         ...category,
//         image: categoryImages[category.category] || logo, // Attach image
//     }));