import PropTypes from 'prop-types';
import Header from './Header';
import Container from '../ui/Container.styled';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Container>{children}</Container>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.element,
};
