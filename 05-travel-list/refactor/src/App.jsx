import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Stats from "./components/Stats";
import { PackingListProvider } from "./context/PackingListContext";

export default function App() {
  return ( 
    <PackingListProvider>
      <div className="app">
        <Header />
        <ItemForm />
        <ItemList />
        <Stats />
      </div>
    </PackingListProvider>
  );
}
