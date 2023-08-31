import { useState } from "react";


const Todolist = () => {
    const [Todos, setTodos] = useState([]);

    const [Textbody, setTextbody] = useState("");

    const [Number, setNumber] = useState ("");

    const [InputValue, setInputValue] = useState ("");

    const [EditMode, setEditMode] = useState (null);

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleId = (e) => {
        setNumber(e.target.value);
    };

    const handleText = (e) => {
        setTextbody(e.target.value);
    };

    const Addbtn = () => {
        if (Textbody.trim() === "" || InputValue.trim() === "" || Number.trim() === "") {
            alert ("Please Input An Item")
        } 

        else {
            console.log("Success")

            const newTodo = {
                id : Date.now(),
                number: Number,
                text : InputValue,
                body : Textbody,
                
            };

            setTodos([...Todos,newTodo]);
            // console.log([...Todos, newTodo]);
            setInputValue('');
            setTextbody('');
            setNumber ('');
        }
        
    };

    const deletebtn = (id) => {
        const updatedTodos = Todos.filter ((todo) => todo.id !== id);
        setTodos(updatedTodos)
    };

    const editbtn = (id) => {
        // console.log ("edit to do list")
        setEditMode(id);
        const todoToEdit = Todos.find((todo) => todo.id === id);
        setInputValue (todoToEdit.text);
        setTextbody(todoToEdit.body);
        setNumber(todoToEdit.number)
    }

    const handleUpdateTodo = () => {
        if (InputValue.trim() === '' || Textbody.trim() === '' || Number.trim() === '') {
            alert ("please, Fill in the input field");
        }
        else {
            const updatedTodos = Todos.map((todo) => {
                if (todo.id === EditMode) {
                    return {
                        ...todo,
                        number: Number,
                        text: InputValue,
                        body: Textbody,
                    };
                }

                return todo;
            });

            setTodos(updatedTodos);
            setInputValue ('');
            setTextbody ('');
            setEditMode (null);
            setNumber ('')
        }
    }

    


    return (
        <div className="todo-container">
            <h1>Todo-List</h1>

            <div className="input-container">
                <input type="number" placeholder="ID" value={Number}  onChange={handleId}/>
              { EditMode ? (<button onClick={handleUpdateTodo}>Update</button>): (<button onClick={Addbtn}>Add</button>) }
            </div>

            <div className="input-container1">
            <input type="text" placeholder="Title" value={InputValue}  onChange={handleInput}/>
            </div>

            <textarea cols="42" rows="10" placeholder="Subject" value={Textbody} onChange={handleText}></textarea>

            <div className="todo-list">
                {Todos.map((todo)=>{
                    return(
                        <div key={todo.id}>
                            <ul>
                                <li>Number: {todo.number} </li>
                                <li>Title: {todo.text}</li>
                                <li>Body: {todo.body}</li>
                            </ul>
                            
                            <button className = "span" onClick={() => deletebtn(todo.id)}>Delete</button>
                            <button  onClick={() => editbtn(todo.id)}>Edit</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Todolist;