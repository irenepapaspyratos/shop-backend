import PropTypes from 'prop-types';

import { getStatData } from '../src/services/get-data';
import DataList from '../src/components/DataList';

export function getStaticProps() {
    const products = getStatData('products');

    return {
        props: { products },
    };
}

export default function Products({ products }) {
    return (
        <>
            <h1>Products</h1>
            <DataList listData={products} />
        </>
    );
}

Products.propTypes = {
    products: PropTypes.array,
};
