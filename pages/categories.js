import PropTypes from 'prop-types';

import { getStatData } from '../src/services/get-data';
import DataList from '../src/components/DataList';

export function getStaticProps() {
    const categories = getStatData('categories');

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
