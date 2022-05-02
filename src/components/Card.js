import PropTypes from 'prop-types';

export default function Card(props) {
    return (
        <div>
            <div>
                <h5>{props.id}</h5>
                <h5>{props.name}</h5>
            </div>
        </div>
    );
}

Card.propTypes = {
    props: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.any,
};
