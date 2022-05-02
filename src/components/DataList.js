import PropTypes from 'prop-types';
import Card from './Card';

export default function DataList({ listData }) {
    console.log(listData);
    return (
        <>
            {listData.map(item => {
                return (
                    <div key={item.id}>
                        <Card id={item.id} name={item.name} />
                    </div>
                );
            })}
        </>
    );
}

DataList.propTypes = {
    listData: PropTypes.array,
};
