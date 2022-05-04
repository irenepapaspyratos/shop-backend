import PropTypes from 'prop-types';
import { getStatData } from '../src/services/get-data';
//import getProducts from "../src/services/get-data";
import ProductList from '../src/components/ProductList';
import { SWRConfig } from 'swr';
import { swrFetcher } from '../src/lib/swr-fetcher';

export function getStaticProps() {
    const products = getStatData('products');

    return {
        props: {
            fallback: {
                '/api/products': products,
            },
        },
    };
}

export default function Products({ fallback }) {
    return (
        <SWRConfig value={{ fetcher: swrFetcher, fallback }}>
            <h1>Produkte</h1>
            <ProductList />
        </SWRConfig>
    );
}

Products.propTypes = {
    products: PropTypes.array,
};
