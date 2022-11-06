import { useState } from "react";
import { useListStore } from "../context/ListStore";
import { v4 as uuidv4 } from 'uuid';
import Modal from "./Modal";

export default function AddListModal({open, close}) {

    const [, dispatch] = useListStore();

    const [listName, setListname] = useState(() => '');

    const handleListName = (e) => {
        let { value } = e.target;
        setListname(value); 
    }

    const handleAddList = (e) => {
        e.preventDefault();
        dispatch({
          type: "ADD_LIST",
          payload: {
            id: uuidv4(),
            name: listName,
            tasks: [],
          }
        });
        close();
        setListname('');
      }

    return (
        <Modal header="Add List" open={open} close={close}>
            <form onSubmit={handleAddList}>
                <label htmlFor='add-label'>
                    List Name
                    <input type="text" value={listName} onChange={handleListName} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </Modal>
    )
}