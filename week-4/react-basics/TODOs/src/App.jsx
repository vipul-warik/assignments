import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    id: 1,
  });

  function handleChange(event) {
   setFormData({...formData, [event.target.name]: event.target.value});
  }

  function handleSubmitTodo(event){ 
    event.preventDefault();
    setTodos([...todos, formData]);
    setFormData({
      title: "",
      description: "",
      id: formData.id+1,
    });
    console.log(todos);
  }

  function handleDeleteTodo(id) {
    const newTodo = todos.filter(todo => todo.id !== id);
    setTodos(newTodo);
  }

  return (
    <div>

     <form onSubmit={handleSubmitTodo}>
        Title<input type="text" name='title' onChange={(e) => handleChange(e)} value={formData?.title}/><br></br>
        Description<input type='text' name='description' onChange={(e) => handleChange(e)} value={formData?.description}/>
        <button type="submit">Add Todo</button>
     </form>
        

        {/* Todos */}
        <div>
          { 
            todos?.map((todo) => 
              <div key={todo.id}>
                  <span>{todo?.title}</span>
                  <span>{todo?.description}</span>
                  <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default App
