import Category from './Category';
import useSWR from 'swr';

export default function CategoryGrid() {
    const { data, error } = useSWR('/api/categories');

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }
    return (
        <ul>
            {data.map(category => {
                return (
                    <li key={category.id}>
                        <Category
                            name={category.name}
                            description={category.description}
                            id={category.id}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
