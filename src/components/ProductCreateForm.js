import Router, { mutate, useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';

const initialState = {
    descriptionValue: '',
    priceValue: '',
    nameValue: '',
    tagsValue: '',
    categoryValue: '',
};

export default function ProductCreateForm({ categories: data }) {
    const [productInput, setProductInput] = useState(initialState);
    const router = useRouter();

    React.useEffect(() => {
        if (router.isReady) {
            setProductInput({
                ...productInput,
                nameValue: router.query.nameValue,
                priceValue: router.query.priceValue,
                categoryValue: router.query.categoryValue,
                tagsValue: router.query.tagsValue,
                descriptionValue: router.query.descriptionValue,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const catNameArray = data.map(cat => cat.name);

    let catId = catName => {
        return catNameArray.indexOf(catName) > -1
            ? data[catNameArray.indexOf(catName)].id
            : false;
    };

    const submit = async event => {
        event.preventDefault();

        if (
            !router.query.idValue &&
            catId(productInput.categoryValue) !== false
        ) {
            const response = await fetch('/api/product/create', {
                method: 'POST',
                body: JSON.stringify({
                    description: productInput.descriptionValue,
                    name: productInput.nameValue,
                    price: productInput.priceValue,
                    category: catId(productInput.categoryValue),
                    tags: productInput.tagsValue,
                }),
            });

            router.push('/products');
        } else if (catId(productInput.categoryValue) !== false) {
            const response = await fetch(
                '/api/product/' + router.query.idValue,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        description: productInput.descriptionValue,
                        name: productInput.nameValue,
                        price: productInput.priceValue,
                        category: catId(productInput.categoryValue),
                        tags: productInput.tagsValue,
                    }),
                }
            );
            console.log(await response.json());

            router.push('/products');
        } else {
            //prettier-ignore
            alert("No existing category with this name found. \n\n Please choose an existing one or create a new one first.")
            router.push('/create-product');
        }
    };

    return (
        <>
            <form onSubmit={submit}>
                <label>
                    Product Name
                    <input
                        id="name"
                        placeholder="eg.: Codfish"
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
                        placeholder="eg.: likes to live as couple"
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
                        placeholder="eg.: 19"
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
                        placeholder="eg. Meerwasser"
                        id="categoryList"
                        list="category"
                        name="categoryList"
                        onChange={event => {
                            setProductInput({
                                ...productInput,
                                categoryValue: event.target.value,
                            });
                        }}
                    />
                    <datalist id="category">
                        {data.map(category => {
                            return (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </datalist>
                </label>

                <label>
                    Tags
                    <input
                        required
                        placeholder="eg.: colorful, big, sharp teeth..."
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
                <button
                    type="button"
                    onClick={event => {
                        event.preventDefault();
                        Router.back();
                    }}
                >
                    Cancel
                </button>
            </form>
        </>
    );
}
