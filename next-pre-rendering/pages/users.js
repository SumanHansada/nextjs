function UserList({ users }) {
  return (
    <>
      <h1>List of users</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </>
  );
}

export default UserList;

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
