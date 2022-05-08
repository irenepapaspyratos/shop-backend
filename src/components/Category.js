import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

export default function Category(props) {
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    function enableDeleteMode() {
        setDeleteMode(!isDeleteMode);
    }

    async function putDisable(catName) {
        const data = await fetch('/api/products');
        const products = await data.json();
        const delBool = await products.find(prod => {
            return prod.category === catName;
        });
        delBool
            ? alert(
                  // prettier-ignore
                  "Related products found! \n\n If I were You, I would NOT delete this category!!!!"
              )
            : setIsDisabled(false);
    }

    return (
        <div>
            {isDeleteMode ? (
                <CategoryModeConfirmation
                    {...props}
                    onDisableDeleteMode={enableDeleteMode}
                    isDisabled={isDisabled}
                />
            ) : (
                <CategoryModeShow
                    {...props}
                    isDeleteMode={isDeleteMode}
                    onDisableDeleteMode={enableDeleteMode}
                    onPutDisable={putDisable}
                    isDisabled={isDisabled}
                />
            )}
        </div>
    );
}

function CategoryModeShow({
    id,
    name,
    description,
    onDisableDeleteMode,
    isDisabled,
    onPutDisable,
}) {
    const router = useRouter();

    return (
        <div>
            <div>
                <h5>{name}</h5>
                <h5>{description}</h5>
            </div>

            <div>
                <button
                    disabled={isDisabled}
                    onClick={() => {
                        onPutDisable(name);
                        onDisableDeleteMode();
                    }}
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        router.push({
                            pathname: '/edit-category',
                            query: {
                                idValue: id,
                                nameValue: name,
                                descriptionValue: description,
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

function CategoryModeConfirmation({
    id,
    name,
    description,
    onDisableDeleteMode,
}) {
    const { mutate } = useSWRConfig();

    return (
        <div>
            <div>
                <h5>{name}</h5>
                <h5>{description}</h5>
            </div>
            <div>
                <button
                    type="button"
                    onClick={async () => {
                        const response = await fetch('/api/category/' + id, {
                            method: 'DELETE',
                        });
                        console.log(await response.json());
                        mutate('/api/categories');
                    }}
                >
                    Confirm Delete
                </button>
                <button onClick={onDisableDeleteMode}>Cancel</button>
            </div>
        </div>
    );
}
