import { getProducts, getCollectionByHandle } from '../lib/shopify';

export default function Index({ products, customCollection}) {
  console.log(products);
  console.log(customCollection);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProducts();
  const customCollection = await getCollectionByHandle('components');

  return {
    props: {
      products,
      customCollection,
    },
  };
}
