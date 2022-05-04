import ProductCreateForm from '../src/components/ProductCreateForm';

export default function EditPruduct({
    id,
    name,
    description,
    price,
    tags,
    category,
}) {
    return (
        <>
            <h1>Edit Product</h1>
            <ProductCreateForm
                id={id}
                name={name}
                description={description}
                price={price}
                tags={tags}
                category={category}
            />
        </>
    );
}
