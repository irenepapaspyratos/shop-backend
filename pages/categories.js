import PropTypes from 'prop-types';

import getCategories from '../src/services/get-categories';
import DataList from '../src/components/DataList';

export function getStaticProps() {
    const categories = getCategories();

    return {
        props: { categories },
    };
}

export default function Categories({ categories }) {
    return (
        <>
            <h1>Categories</h1>
            <DataList listData={categories} />
        </>
    );
}

Categories.propTypes = {
    categories: PropTypes.array,
};
