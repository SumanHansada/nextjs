function NewsArticleList({ articles }) {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} {article.title} | {article.category}
            </h2>
          </div>
        );
      })}
    </>
  );
}

export default NewsArticleList;

//  getServerSideProps
//  1.- getServerSideProps runs only on the server side
//    - The function will never run client-side
//    - The code you write inside getServerSideProps won't even be included in the JS bundle
//      that is sent to the browser
//  2.- You can write server-side code directly in getServerSideProps
//    - Accessing the file system using the fs module or querying a database can be done inside
//      getServerSideProps
//    - You also don't have to worry about including API keys in getServerSideProps as that won't
//      make it to the browser
//  3.- getServerSideProps is allowed only in a page and cannot be run from a regular component file
//    - It is used only for pre-rendering and not client-side data fetching
//  4.- getServerSideProps should return an object and object should contain a props key which is an object
//  5.- getServerSideProps will run at request time
export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();
  console.log("Pre-rendering NewsArticleList");

  return {
    props: {
      articles: data,
    },
  };
}
