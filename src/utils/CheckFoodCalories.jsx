let calories = 0;
let caloriesForFood = 0;

export const checkCategoryCalories = (categoryName) => {
    if (categoryName === 'ירקות') {
        return calories = 25;
    } else if (categoryName === 'דגנים וקטניות') {
        return calories = 80;
    }
    else if (categoryName === 'חלב מוצריו ותחליפיו') {
        return calories = 100;
    }
    else if (categoryName === 'נשנושים') {
        return calories = 200;
    }
    else if (categoryName === 'פירות') {
        return calories = 60;
    }
    else if (categoryName === 'עוף בשר דגים ותחליפי חלבון מן הצומח') {
        return calories = 200;
    }
    else if (categoryName === 'שומנים') {
        return calories = 50;
    }
    else {
        return null;
    }
};

export const calculateCalories = (categoryName, calories) => {
    if (categoryName === 'ירקות') {
        const caloriesForFood = 2500 / calories;
        return caloriesForFood.toFixed(0);
    }
    else if (categoryName === 'דגנים וקטניות') {
        const caloriesForFood = 8000 / calories;
        return caloriesForFood.toFixed(0);
    }
    else if (categoryName === 'חלב מוצריו ותחליפיו') {
        const caloriesForFood = 10000 / calories;
        return caloriesForFood.toFixed(0);
    }
    else if (categoryName === 'נשנושים') {
        const caloriesForFood = 10000 / calories;
        return caloriesForFood.toFixed(0);
    }
    else if (categoryName === 'פירות') {
        const caloriesForFood = 6000 / calories;
        return caloriesForFood.toFixed(0);
    }
    else if (categoryName === 'עוף בשר דגים ותחליפי חלבון מן הצומח') {
        const caloriesForFood = 20000 / calories;
        return caloriesForFood.toFixed(0);
    }
    else if (categoryName === 'שומנים') {
        const caloriesForFood = 5000 / calories;
        return caloriesForFood.toFixed(0);
    }
    else {
        return null;
    }
};