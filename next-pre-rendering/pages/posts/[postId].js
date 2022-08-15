import { useRouter } from "next/router";

function Post({ post }) {
  // const router = useRouter();
  // if (router.isFallback) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}

export default Post;

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  const paths = data.map((post) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  });

  // return {
  //   paths,
  //   fallback: false,
  // };

  //  getStaticPaths fallback:false
  //  1. The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps
  //  2. If fallback is set to false, then any paths not returned by getStaticProps will result in a 404 page
  //  When? to use the fallback:false
  //  - The false value is most suitable if you have an application with small number of paths to pre-render
  //  - When new pages are not added often
  //  - A blog site with few articles is a good example for fallback set to false

  //  getStaticPaths fallback:true
  //  1.  The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps
  //  2.  The paths that have not been generated at build time will not result in 404 page. Instead, Next.js will
  //      serve a "fallback" version of the page on the first request to such a path
  //  3.  In the background, Next.js will statically generate the requested path HTML and JSON. This includes running
  //      getStaticProps
  //  4.  When that's done, the browser receives the JSON for the generated path. This will be used to automatically
  //      render the page with the required props. From the user's prespective, the page will be swapped from the
  //      fallback page to the full page
  //  5.  At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same
  //      path will serve the generated page, just like other pages pre-rendered at the build time
  //  When? to user the fallback:true
  //  - The true value is most suitable if your app has a very large number of static pages that depend on data
  //  - A large e-commerece site
  //  - You want all the product pages to be pre-rendered but if you have thousand products, builds can take a really long time
  //  - You may statically generate a small subset of products that are popular and use fallback:true for the rest
  //  - When someone requests a page that's not generated yet, the user will see the page with a loading indicator
  //  - Shortly after, getStaticProps finishes and the page will be rendered with the requested data. From then onwards,
  //    everyone who requests the same page will get the statically pre-rendered page
  //  - This ensures that the users always have a fast experience while preserving fast builds and the benefits of static generation

  //  getStaticPaths fallback:'blocking'
  //  1.  The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps
  //  2.  The paths that have not been generated at build time will not result in a 404 page. Instead, on first
  //      request, Next.js will render the page on the server and return the generated HTML
  //  3.  When that's done, the browser receives the HTML for the generated path. From the user's perspective, it
  //      will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of
  //      loading/fallback state
  //  4.  At the same time, Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same
  //      path will serve the generated page, just like other pages pre-rendered at build time
  //  When? to user fallback:'blocking'
  //  - On a UX level, sometimes, people prefer the page to be loaded without a loading indicator if the wait time is a
  //    few milliseconds. This helps avoid the layout shift
  //  - Some crawlers did not support JavaScript. The loading page would be rendered and then the full page would be
  //    loaded which was causing a problem

  return {
    paths: [
      {
        params: { postId: "1" },
      },
      {
        params: { postId: "2" },
      },
      {
        params: { postId: "3" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data,
    },
  };
}
