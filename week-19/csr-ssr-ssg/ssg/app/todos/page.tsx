
import revalidateTodosTag from "@/app/lib/actions/tags";

export default async function Home() {

  //now we will revalidate the page if request has "todos" tag
  const res = await fetch("https://sum-server.100xdevs.com/todos", {
    next: {
      tags: ["todos"]
    }
  })

  revalidateTodosTag()

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
