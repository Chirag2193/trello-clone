import React, { useState } from 'react'
import  { MemoizedList as List } from '../components/List';
import { ListStoreProvider, useListStore } from '../context/ListStore';
import styles from '../styles/Home.module.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";  //core css
import "primeicons/primeicons.css";   //icons
import { ListReducer } from '../reducer/ListReducer';
import AddListModal from '../components/AddListModal';
import AddTaskModal from '../components/AddTaskModal';
import { v4 as uuidv4 } from 'uuid';


const Lists = () => {
  const [visibleListModal, setVisibleListModal] = useState(false);
  const [visibleTaskModal, setVisibleTaskModal] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const [lists] = useListStore();

  const addTaskHandler = (listId) => {
    setActiveListId(listId);
    setVisibleTaskModal(true);
  }

  return (
    <div className={styles['container']}>
        {lists && Object.keys(lists).map((listId) => {
          return <List key={listId} addTaskHandler={addTaskHandler} listId={listId} listDetails={lists[listId]} />
        })}

      <AddListModal open={visibleListModal} 
        close={() => setVisibleListModal(false)} />

      <AddTaskModal open={visibleTaskModal}
        close={() => setVisibleTaskModal(false)}
        activeListDetails={{ activeListId, setActiveListId }} />
      
      <button type='button' className={`${styles['add-list-button']} ${styles['btn']}`} onClick={() => setVisibleListModal(true)}>Add List!</button>

    </div>
  )
}

export default function Home() {
  return (
    <ListStoreProvider initialState={{
      [uuidv4()]: {
        name: "TO-DO",
        tasks: [{
          id: uuidv4(),
          name: "Let's Learn React!"
        }]
      },
      [uuidv4()]: {
        name: "IN-PROGRESS",
        tasks: [{
          id: uuidv4(),
          name: "Let's learn Vanilla JS"
        }]
      }
    }} reducer={ListReducer}>
      <Lists />
    </ListStoreProvider>
  )
}
