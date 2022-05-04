import { useState } from 'react';
import { mutate, useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

export default function Product(props) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);

    function enableEditMode() {
        setIsEditMode(true);
    }

    function enableDeleteMode() {
        setDeleteMode(!isDeleteMode);
    }

    return (
        <div>
            {isDeleteMode ? (
                <ProductModeConfirmation
                    {...props}
                    onDisableDeleteMode={enableDeleteMode}
                />
            ) : (
                <ProductModeShow
                    {...props}
                    onEnableEditMode={enableEditMode}
                    isDeleteMode={isDeleteMode}
                    onDisableDeleteMode={enableDeleteMode}
                />
            )}
        </div>
    );
}

function ProductModeShow({
    id,
    name,
    description,
    tags,
    price,
    category,
    onEnableEditMode,
    onDisableDeleteMode,
    isDeleteMode,
}) {
    const router = useRouter();

    return (
        <div>
            <div>
                <h5>{name}</h5>
                <h5>{price}</h5>
            </div>
            <div>
                <p>{description}</p>
                <p>{category}</p>
            </div>
            <ul>
                {tags.map((tag, index) => {
                    return (
                        <div key={index}>
                            <li>{tag}</li>
                        </div>
                    );
                })}
            </ul>
            <div>
                <button
                    size="small"
                    onClick={() => {
                        onDisableDeleteMode();
                        console.log(isDeleteMode);
                    }}
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        router.push({
                            pathname: '/edit-product',
                            query: {
                                id: id,
                                nameValue: name,
                                descriptionValue: description,
                                priceValue: price,
                                tagsValue: tags,
                                categoryValue: category,
                            },
                        });
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

function ProductModeConfirmation({
    id,
    name,
    description,
    tags,
    price,
    category,
    onDisableDeleteMode,
}) {
    const { mutate } = useSWRConfig();

    return (
        <div>
            <div>
                <h5>{name}</h5>
                <h5>{price}</h5>
            </div>
            <div>
                <p>{description}</p>
                <p>{category}</p>
            </div>
            <ul>
                {tags.map((tag, index) => {
                    return (
                        <div key={index}>
                            <li>{tag}</li>
                        </div>
                    );
                })}
            </ul>
            <div>
                <button
                    type="button"
                    size="small"
                    onClick={async () => {
                        const response = await fetch('/api/product/' + id, {
                            method: 'DELETE',
                        });
                        console.log(await response.json());
                        mutate('/api/products');
                    }}
                >
                    Confirm Delete
                </button>
                <button onClick={onDisableDeleteMode}>Cancel</button>
            </div>
        </div>
    );
}
