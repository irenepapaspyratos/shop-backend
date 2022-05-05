import PropTypes from 'prop-types';
import getCategories from '../src/services/get-categories';
import CategoryList from '../src/components/CategoryList';
import { SWRConfig } from 'swr';
import swrFetcher from '../src/lib/swr-fetcher';

export async function getStaticProps() {
    const categories = await getCategories();

    return {
        props: {
            fallback: {
                '/api/categories': categories,
            },
        },
    };
}

export default function Categories({ fallback }) {
    return (
        <>
            <SWRConfig value={{ fetcher: swrFetcher, fallback }}>
                <h1>Categories</h1>
                <CategoryList />
            </SWRConfig>
        </>
    );
}

Categories.propTypes = {
    categories: PropTypes.array,
    fallback: PropTypes.any,
};
