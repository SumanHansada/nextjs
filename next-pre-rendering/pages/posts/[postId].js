function Post({ post }) {
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
  //  When? to use the fallback
  //  - The false value is most suitable if you have an application with small number of paths to pre-render
  //  - When new pages are not added often
  //  - A blog site with few articles is a good example for fallback set to false

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
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}
