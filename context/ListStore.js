import React, { useReducer } from "react";

const ListStore = React.createContext();
ListStore.displayName = "ListStore";

export const useListStore = () => React.useContext(ListStore);

export const ListStoreProvider = ({children, initialState, reducer}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <ListStore.Provider value={[state, dispatch]}>{children}</ListStore.Provider>
}