import "./Todo.css"
import { user_data_state } from "../../modules/states"

function Todo()
{
    const [userData, setUserData] = user_data_state.useState()

    return <div>
        <h2>To-do:</h2>
        {/* {userData && userData.todo_list.map()} */}
    </div>
}

export default Todo