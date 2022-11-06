import React, { useState } from "react";
import Task from "./Task";
import styles from '../styles/Home.module.css';
import { useListStore } from "../context/ListStore";

function List({ listId, listDetails: { tasks, name }, addTaskHandler: showAddTaskModal }) {

    const [, dispatch] = useListStore();

    const handleDrop = (ev) => {
        ev.preventDefault();
        const droppedTask = ev.dataTransfer.getData('taskId');
        const droppedTaskCurrentListId = ev.dataTransfer.getData('listId');
        dispatch({
            type: "MOVE_TASK",
            payload: {
                taskToBeMoved: {
                    id: droppedTask,
                    prevListId:droppedTaskCurrentListId
                },
                newListId: listId
            }
        })
    }

    const handleDragOver = (ev) => {
        ev.preventDefault();
    }
    return (
        <div className={styles['list']}>
            <h4>{name}</h4>
            <div className={styles['task-container']} onDragOver={handleDragOver} onDrop={handleDrop}>
                {tasks && tasks.length ? tasks.map((task) => {
                    return (
                        <Task listId={listId} key={task.id} taskDetails={task} />
                    )
                }) : null }
            </div>
            <button onClick={() => showAddTaskModal(listId)}>Add Task</button>
        </div>
    )
}

export const MemoizedList = React.memo(List);