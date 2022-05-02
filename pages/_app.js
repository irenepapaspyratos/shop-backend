import PropTypes from 'prop-types';

import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
};
