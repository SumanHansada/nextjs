import User from "../components/user";

function UserList({ users }) {
  return (
    <>
      <h1>List of users</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
}

export default UserList;

// 1. getStaticProps run only on the server side
//    The function will never run client side
//    The code you write inside getStaticProps won't be included in the JS bundle that is sent to the browser
// 2. You can write server-side code directly in getStaticProps
//    Accessing the file system using the fs module or querying a database can be done inside getStaticProps
//    You also don't have to worry about including API keys in getStaticProps as they won't make it to the browser
// 3. getStaticProps is allowed only in a page and cannot be run from a regular component file.
//    It is used for pre-rendering and not client-side data fetching
// 4. getStaticProps should return an object and object should contain a props key which is an object*
//    In our example, we returned an object & the object contained a props key which was an object as well
// 5. getStaticProps will run at build time
//    During development, getStaticProps runs on every request
//
export async function getStaticProps() {
  const response = fetch("https://jsonplaceholder.typicode.com/users");
  const data = await (await response).json();
  console.log(data);

  return {
    props: {
      users: data,
    },
  };
}
