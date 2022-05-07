import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

export default function Product(props) {
    const [isDeleteMode, setDeleteMode] = useState(false);

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
                    }}
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        router.push({
                            pathname: '/edit-product',
                            query: {
                                idValue: id,
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
