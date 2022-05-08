import PropTypes from 'prop-types';
import getProducts from '../src/services/get-products';
import getCategories from '../src/services/get-categories';
import ProductList from '../src/components/ProductList';
import { SWRConfig } from 'swr';
import swrFetcher from '../src/lib/swr-fetcher';

export async function getStaticProps() {
    const products = await getProducts();
    const categories = await getCategories();

    return {
        props: {
            fallback: {
                '/api/products': products,
                '/api/categories': categories,
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
    fallback: PropTypes.object,
};
