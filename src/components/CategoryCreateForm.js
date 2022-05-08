import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';

const initialState = {
    descriptionValue: '',
    nameValue: '',
};

export default function CategoryCreateForm() {
    const [categoryInput, setCategoryInput] = useState(initialState);
    const router = useRouter();

    React.useEffect(() => {
        if (router.isReady) {
            setCategoryInput({
                ...categoryInput,
                nameValue: router.query.nameValue,
                descriptionValue: router.query.descriptionValue,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const submit = async event => {
        event.preventDefault();

        if (!router.query.idValue) {
            const response = await fetch('/api/category/create', {
                method: 'POST',
                body: JSON.stringify({
                    description: categoryInput.descriptionValue,
                    name: categoryInput.nameValue,
                }),
            });
            console.log(response);
            router.push('/categories');
        } else {
            const response = await fetch(
                '/api/category/' + router.query.idValue,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        description: categoryInput.descriptionValue,
                        name: categoryInput.nameValue,
                    }),
                }
            );
            console.log(await response.json());

            router.push('/categories');
        }
    };

    return (
        <>
            <form onSubmit={submit}>
                <label>
                    Category Name
                    <input
                        required
                        placeholder="eg.: Meerwasser"
                        type="text"
                        name="name"
                        label="name"
                        value={categoryInput.nameValue}
                        onChange={event => {
                            setCategoryInput({
                                ...categoryInput,
                                nameValue: event.target.value,
                            });
                        }}
                    />
                </label>
                <label>
                    Category Description
                    <input
                        required
                        placeholder="Add a description of the category here..."
                        type="text"
                        name="description"
                        label="description"
                        value={categoryInput.descriptionValue}
                        onChange={event => {
                            setCategoryInput({
                                ...categoryInput,
                                descriptionValue: event.target.value,
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
