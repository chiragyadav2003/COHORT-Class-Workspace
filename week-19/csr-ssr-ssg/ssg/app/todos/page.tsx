
export default async function Home() {
  const res = await fetch("https://sum-server.100xdevs.com/todos")
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
