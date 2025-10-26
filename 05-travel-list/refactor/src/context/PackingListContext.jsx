import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const PackingListContext = createContext(undefined);

const initialState = { items: [] };

function packingListReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.payload] };
    case "TOGGLE_ITEM":
      return {
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, packed: !item.packed } : item
        ),
      };
    case "DELETE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_ITEMS":
      return initialState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function PackingListProvider({ children }) {
  const [state, dispatch] = useReducer(packingListReducer, initialState);

  const addItem = useCallback(
    (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    []
  );
  const toggleItem = useCallback(
    (id) => dispatch({ type: "TOGGLE_ITEM", payload: id }),
    []
  );
  const deleteItem = useCallback(
    (id) => dispatch({ type: "DELETE_ITEM", payload: id }),
    []
  );
  const clearItems = useCallback(() => dispatch({ type: "CLEAR_ITEMS" }), []);

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      toggleItem,
      deleteItem,
      clearItems,
    }),
    [state.items, addItem, toggleItem, deleteItem, clearItems]
  );

  return (
    <PackingListContext.Provider value={value}>
      {children}
    </PackingListContext.Provider>
  );
}

export function usePackingList() {
  const context = useContext(PackingListContext);

  if (!context) {
    throw new Error("usePackingList must be used within a PackingListProvider");
  }

  return context;
}
