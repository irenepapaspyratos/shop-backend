import PropTypes from 'prop-types';
import getProducts from '../src/services/get-products';
//import getProducts from "../src/services/get-data";
import ProductList from '../src/components/ProductList';
import { SWRConfig } from 'swr';
import { swrFetcher } from '../src/lib/swr-fetcher';

export async function getStaticProps() {
    const products = await getProducts();

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
            <h1>Products</h1>
            <ProductList />
        </SWRConfig>
    );
}

Products.propTypes = {
    products: PropTypes.any,
};
