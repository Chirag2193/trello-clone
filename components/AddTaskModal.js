import { useState } from "react";
import { useListStore } from "../context/ListStore";
import { v4 as uuidv4 } from 'uuid';
import Modal from "./Modal";

export default function AddTaskModal({ open, close, activeListDetails: { activeListId, setActiveListId } }) {

    const [, dispatch] = useListStore();

    const [taskName, setTaskname] = useState('');

    const handleTaskName = (e) => {
        let { value } = e.target;
        setTaskname(value);
    }

    const handleAddTaskSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_TASK",
            payload: {
                listId : activeListId.slice(),
                task: {
                    name: taskName,
                    id: uuidv4()
                }
            }
        });
        close();
        setTaskname('');
        setActiveListId(null);
    }

    return (
        
        <Modal open={open} close={close}>
            <form onSubmit={handleAddTaskSubmit}>
                <label htmlFor="task-name">
                    Task Name
                    <input name="task-name" value={taskName} onChange={handleTaskName} type='text' />
                </label>
                <button type="submit">Add Task</button>
            </form>
        </Modal>
    )
}