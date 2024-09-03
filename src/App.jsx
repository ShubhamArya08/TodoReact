import { useEffect, useState } from 'react'

const App = () => {
  const [allTodo, setAllTodo] = useState([])
  const [singleTodo, setSingleTodo] = useState({
    title: "",
    desc: ""
  });



  function handleAddTodo() {
    setAllTodo(prev => [...prev, singleTodo])
    saveTodoLocalStorage([...allTodo, singleTodo])
  }

  function deleteTodo(i) {
    let newArr = [...allTodo]
    newArr.splice(i, 1);
    setAllTodo(newArr)
  }

  function saveTodoLocalStorage(todo) {
    localStorage.setItem("todos", JSON.stringify(todo))
  }

  function getTodoFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("todos")) || [];
    setAllTodo(data)
  }


  useEffect(() => {
    getTodoFromLocalStorage()
  }, [])
  return (
    <>

      <div>
        <input type="text" placeholder='title' onChange={(e) => setSingleTodo(prev => ({ ...prev, title: e.target.value }))} />
        <br />
        <br />
        <input type="text" placeholder='desc..' onChange={(e) => setSingleTodo(prev => ({ ...prev, desc: e.target.value }))} />
        <br />
        <br />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        {
          allTodo.map((data, i) => (
            <div key={i}>
              <h1>{data.title}</h1>
              <p>{data.desc}</p>
              <button onClick={() => deleteTodo(i)}>Delete</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
