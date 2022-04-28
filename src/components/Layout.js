import Header from './Header';
import Container from '../ui/Container';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
