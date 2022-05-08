import useSWR from 'swr';
import Product from './Product';
import { useState } from 'react';

export default function ProductList() {
    const [selectValue, setSelectValue] = useState('All');
    const { data: products, errorProducts } = useSWR('/api/products');
    const { data: categories, errorCategories } = useSWR('/api/categories');

    if (errorProducts) {
        return <h3>Error: {errorProducts.message}</h3>;
    }

    if (errorCategories) {
        return <h3>Error: {errorCategories.message}</h3>;
    }

    function handleSelect(val) {
        setSelectValue(val);
    }

    return (
        <>
            <select
                onChange={event => {
                    handleSelect(event.target.value);
                }}
            >
                <option value="default">All</option>
                {categories.map(category => {
                    return (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    );
                })}
            </select>
            <ul>
                {products.map(product => {
                    return selectValue !== 'All' ? (
                        product.category == selectValue && (
                            <li key={product.id}>
                                <Product
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    category={product.category}
                                    tags={product.tags}
                                />
                            </li>
                        )
                    ) : (
                        <li key={product.id}>
                            <Product
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                category={product.category}
                                tags={product.tags}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
