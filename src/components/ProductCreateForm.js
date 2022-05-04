import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

const initialState = {
    descriptionValue: '',
    priceValue: '',
    nameValue: '',
    tagsValue: '',
    categoryValue: '',
};

export default function ProductCreateForm({
    id,
    name,
    description,
    price,
    tags,
    category,
}) {
    const [productInput, setProductInput] = useState(initialState);
    const { data, error } = useSWR('api/categories');
    const router = useRouter();

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }
    if (id) {
        setProductInput({
            ...productInput,
            name: name,
            description: description,
            price: price,
            tags: tags,
            category: category,
        });
    }
    console.log(name, description);
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
                    Name
                    <input
                        id="name"
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
                            // setProductInput((prevState) => ({
                            //   productInput: {
                            //     // object that we want to update
                            //     ...prevState.productInput, // keep all other key-value pairs
                            //     nameValue: event.target.value, // update the value of specific key
                            //   },
                            // }));
                        }}
                    />
                </label>

                <label>
                    Description
                    <input
                        required
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
                    Price / Fish
                    <input
                        required
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
                    Category
                    <input
                        required
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
                        placeholder="Enter tags separated by comma"
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
/*  <input required id="categoryList" list="category" name="categoryList" />

        <datalist
          id="category"
          value={productInput.categoryValue}
          onChange={(event) => {
            setProductInput({
              ...productInput,
              categoryValue: event.target.value,
            });
          }}
        >
          {data.map((category) => {
            return (
              <div key={category.id}>
                <option value={category.name} />
              </div>
            );
          })}
        </datalist>
*/
