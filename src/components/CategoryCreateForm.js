import { useRouter } from 'next/router';
import { useState } from 'react';

const initialState = {
    descriptionValue: '',
    nameValue: '',
};

export default function CategoryCreateForm() {
    const [categoryInput, setCategoryInput] = useState(initialState);

    const router = useRouter();

    const submit = async event => {
        event.preventDefault();

        const response = await fetch('/api/category/create', {
            method: 'POST',
            body: JSON.stringify({
                description: categoryInput.descriptionValue,
                name: categoryInput.nameValue,
            }),
        });

        router.push('/categories');
    };

    return (
        <>
            <form onSubmit={submit}>
                <label>
                    Category Name
                    <input
                        required
                        placeholder="Sea water"
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
            </form>
        </>
    );
}
