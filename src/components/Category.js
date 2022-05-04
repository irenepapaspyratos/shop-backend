import { useState } from 'react';
import { mutate, useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import Product from '../models/Product';

export default function Category(props) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    function enableEditMode() {
        setIsEditMode(true);
    }

    function enableDeleteMode() {
        setDeleteMode(!isDeleteMode);
    }

    function putDisable() {
        console.log('hallo-----------------------------------------------');
        //let product = await Product.findOne({})
        setIsDisabled(!isDisabled);
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
                    onEnableEditMode={enableEditMode}
                    isDisabled={isDisabled}
                    onDisableDeleteMode={enableDeleteMode}
                    onPutDisable={putDisable}
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
                    size="small"
                    onClick={() => {
                        onPutDisable();

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
    isDisabled,
}) {
    const { mutate } = useSWRConfig();
    console.log(id);

    return (
        <div>
            <div>
                <h5>{name}</h5>
                <h5>{description}</h5>
            </div>

            <div>
                <button
                    disabled={isDisabled}
                    type="button"
                    size="small"
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
