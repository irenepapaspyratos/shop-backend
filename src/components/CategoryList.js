import useSWR from 'swr';
import Category from './Category';

export default function CategoryList() {
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
                            id={category.id}
                            name={category.name}
                            description={category.description}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
