export const ListReducer = (state, action) => {
    let clonedState;
    switch (action.type) {
      case 'ADD_LIST':
        clonedState = { ...state };
        return {...clonedState, [action.payload.id]: { ...action.payload }};
        
      case 'ADD_TASK':
        clonedState = {...state }
        return {
          ...state, [action.payload.listId]: {
            name: clonedState[action.payload.listId].name,
            tasks: [...clonedState[action.payload.listId].tasks, action.payload.task]
          }
        }
      
      case 'MOVE_TASK':
        clonedState = { ...state }
        const taskToBeMoved = { ...action.payload.taskToBeMoved }
        const newListId = action.payload.newListId.slice();
        const prevListId = action.payload.taskToBeMoved.prevListId.slice();
        const prevListData = clonedState[prevListId];

        if(newListId === prevListId) return {...clonedState}

        return {
          ...state,
          [prevListId]: {
            name: prevListData.name,
            tasks: prevListData.tasks.filter((task) => task.id !== taskToBeMoved.id)
          },
          [newListId]: {
            name: clonedState[newListId].name,
            tasks: [...clonedState[newListId].tasks, ...prevListData.tasks.filter((task) => task.id === taskToBeMoved.id)]
          }
        }
    
      default:
        return state;
    }
  }