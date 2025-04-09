import vegetablesImage from '/images/ירקות.webp';
import cerealsImage from '/images/דגנים.webp';
import snackingImage from '/images/נשנושים.webp';
import oilImage from '/images/שמנים.webp';
import fruitsImage from '/images/פירות.webp';
import meatImage from '/images/חלבון.webp';
import milkImage from '/images/חלב.webp';
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

export const sortedCategories = categories
    .sort((a, b) => a.id - b.id)
    .map(category => ({
        ...category,
        image: categoryImages[category.category] || logo, // Attach image
    }));