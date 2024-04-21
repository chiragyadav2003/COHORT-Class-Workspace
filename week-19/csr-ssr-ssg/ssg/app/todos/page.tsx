
export default async function Home() {

  //now we will revalidate the todos after every 10 seconds 
  // Clear cache every 10 seconds
  const res = await fetch("https://sum-server.100xdevs.com/todos", {
    next: {
      revalidate: 10
    }
  })
  const data = await res.json()
  console.log(JSON.stringify(data))
  return (
    <div>
      Hello, i am from todos
      <div>
        {
          data.todos.map((todo: any) => {
            return (
              <div key={todo.id}>
                {todo.title}
                {todo.description}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
