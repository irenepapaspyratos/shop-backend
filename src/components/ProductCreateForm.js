import { useRouter } from 'next/router';
import { useState } from 'react';

const initialState = {
    descriptionValue: '',
    priceValue: '',
    nameValue: '',
    tagsValue: '',
    categoryValue: '',
};

export default function ProductCreateForm() {
    const [productInput, setProductInput] = useState(initialState);

    const router = useRouter();

    const submit = async event => {
        event.preventDefault();

        const response = await fetch('/api/product/create', {
            method: 'POST',
            body: JSON.stringify({
                description: productInput.descriptionValue,
                name: productInput.nameValue,
                price: productInput.priceValue,
                category: productInput.categoryValue,
                tags: productInput.tagsValue,
            }),
        });

        router.push('/products');
    };

    return (
        <>
            <form onSubmit={submit}>
                <label>
                    Product Name
                    <input
                        id="name"
                        placeholder="Codfish"
                        required
                        type="text"
                        name="name"
                        label="name"
                        value={productInput.nameValue}
                        onChange={event => {
                            setProductInput({
                                ...productInput,
                                nameValue: event.target.value,
                            });
                        }}
                    />
                </label>

                <label>
                    Product Description
                    <input
                        required
                        placeholder="likes to live as couple"
                        type="text"
                        name="description"
                        label="description"
                        value={productInput.descriptionValue}
                        onChange={event => {
                            setProductInput({
                                ...productInput,
                                descriptionValue: event.target.value,
                            });
                        }}
                    />
                </label>

                <label>
                    Price p.P.
                    <input
                        required
                        placeholder="19"
                        type="text"
                        name="price"
                        label="price"
                        value={productInput.priceValue}
                        onChange={event => {
                            if (!event.target.value.match(/[^0-9]/)) {
                                setProductInput({
                                    ...productInput,
                                    priceValue: event.target.value,
                                });
                            } else {
                                alert('Only numeric input allowed');
                            }
                        }}
                    />
                </label>

                <label>
                    Category ID
                    <input
                        required
                        placeholder="62736898cdfe5b912b81df35"
                        type="text"
                        name="category"
                        label="category"
                        value={productInput.categoryValue}
                        onChange={event => {
                            setProductInput({
                                ...productInput,
                                categoryValue: event.target.value,
                            });
                        }}
                    />
                </label>

                <label>
                    Tags
                    <input
                        required
                        placeholder="colorful, big, sharp teeth..."
                        type="text"
                        name="tags"
                        label="tags"
                        value={productInput.tagsValue}
                        onChange={event => {
                            const tagArray = event.target.value.split(',');

                            setProductInput({
                                ...productInput,
                                tagsValue: tagArray,
                            });
                        }}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}
