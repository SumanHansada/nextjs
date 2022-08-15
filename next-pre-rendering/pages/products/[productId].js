import { useRouter } from "next/router";

function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {product.id} {product.title} {product.price}
      </h2>
      <p>{product.description}</p>
      <hr />
    </div>
  );
}

export default Product;

//  Incremental Static Regeneration (ISR)
//  There was a need to update only those pages which needed a change without having to rebuild the entire app
//  Incremental Static Regeneration (ISR)
//  With ISR, Next.js allows you to update static pages after you've built your application
//  You can statically generate individual pages without needing to rebuild the entire site, effectively solving the
//  issue of dealing with state data
//  How?
//  In the getStatiProps function, apart from props key, we can specify a revalidate key
//  The value of revalidate is the number of seconds after which a page re-generation can occur
//  Re-generation
//  - A re-generation is initiated only if a user makes a request the revalidate time
//  - If a user visits our product details page but there is no other user hitting that page the entire day,
//    the re-generation does not happen
//  - revalidate does not mean the page automatically re-generates every 10 seconds
//  - It simply denotes the time after which, if a user makes a request, a re-generation has to be initiated
//  - The re-generation can also fail and the previously cached HTML could be served till the subsequent
//    re-generations succeed

export async function getStaticProps(context) {
  const { params } = context;
  console.log(`Regenerating product ${params.productId}`);
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );
  const data = await response.json();

  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}
