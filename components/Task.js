import styles from '../styles/Home.module.css'

export default function Task({listId, taskDetails}) {
    const handleDragStart = (ev) =>{
        ev.dataTransfer.setData('taskId', taskDetails.id.slice());
        ev.dataTransfer.setData('listId', listId.slice());
    }
    return (
        <div draggable onDragStart={handleDragStart} className={styles['task']}>
            <p className="task-title">{taskDetails.name}</p>
        </div>
    )
}