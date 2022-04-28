import Link from 'next/link';

export default function Header() {
  return (
    <>
      <Link href="/products" passHref>
        Products
      </Link>

      <Link href="/categories" passHref>
        Categories
      </Link>

      <Link href="/create-product" passHref>
        Add Products
      </Link>

      <Link href="/create-category" passHref>
        Add Categories
      </Link>
    </>
  );
}
