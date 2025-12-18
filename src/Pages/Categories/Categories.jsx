import React from 'react';
import useCategories from '../../CustomHooks/useCategories';

const Categories = () => {

    const {categories} = useCategories();
    return (
        <div>
            {categories.length}
        </div>
    );
};

export default Categories;