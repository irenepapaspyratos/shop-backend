import Container from '../src/ui/Container.styled';
import getCategories from '../src/services/get-categories';
import getProducts from '../src/services/get-products';

export async function getServerSideProps() {
    const categories = await getCategories();
    const products = await getProducts();

    return {
        props: { categories, products },
    };
}

export default function Home({ categories, products }) {
    return (
        <Container>
            <h1 variant="h1">Home</h1>
            <article>
                <h2>Number of Products</h2>
                <p>{products.length}</p>
            </article>
            <article>
                <h2>Number of Categories</h2>
                <p>{categories.length}</p>
            </article>
        </Container>
    );
}
