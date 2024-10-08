import "./Todo.css"
import { user_data_state } from "../../modules/states"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import { Todo, UserData } from "server/src/middleware/auth";

function TodoPage()
{
    const [userData, setUserData] = user_data_state.useState()
    const [todoList, setTodoList] = useState<Todo[]>([])

    const [newTaskDate, setNewTaskDate] = useState<string>("")
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")

    useEffect(() => {
        if (userData)
        {
            let cloned_todo = [...(userData.todo_list||[])]
            cloned_todo = cloned_todo.sort((a, b) => {
                return a.timestamp-b.timestamp
            })
            setTodoList(cloned_todo)
        } else {
            setTodoList([])
        }

    }, [userData])

    function addTask()
    {
        const new_task: Todo = {
            title: newTaskTitle,
            timestamp: new Date(newTaskDate).getTime(),
            completed: false
        }
        
        const new_data: UserData = JSON.parse(JSON.stringify(userData))
        new_data.todo_list.push(new_task)
        setUserData(new_data);
    }

    function done(index: number) {
        const new_data: UserData = JSON.parse(JSON.stringify(userData));
        new_data.todo_list[index].completed = true;
        setUserData(new_data);
    }

    return <div>
        <h3 style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>To-do:</h3>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" style={{background: "transparent", color: "white"}} 
                    value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)}/>
            </Form.Group>
            <br></br>
            <br></br>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Task Title</Form.Label>
                <Form.Control type="text" style={{background: "transparent", color: "white"}} 
                    value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}/>
            </Form.Group>
        </Form>
        <Button variant="success" onClick={addTask}>Add Task</Button>
        <br />
        <br />
        {todoList.map((todo, index) => {
            return <div key={index}>
                {todo.title}&nbsp;&nbsp;&nbsp;&nbsp;
                {todo.completed ? "Done" : "Not Done"}&nbsp;&nbsp;
                <Button onClick={() => done(index)}>complete</Button>
            </div>
        })}
    </div>
}

export default TodoPage