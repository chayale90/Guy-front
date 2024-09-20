import React from 'react'

import CategoryCarousel from './CategoryCarousel'
import CategoryGrid from './CategoryGrid '




const CategoryCards = ({ categoriesList, categoryName, isLoading, isCarousel }) => {

    return (
        isCarousel ? (
            <CategoryCarousel categoriesList={categoriesList} categoryName={categoryName} isLoading={isLoading} />
        ) : (
            <CategoryGrid categoriesList={categoriesList} isLoading={isLoading} />
        )
    )
}

export default CategoryCards