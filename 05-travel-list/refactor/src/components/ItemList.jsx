import { useState } from "react";
import { usePackingList } from "../context/PackingListContext";
import { useSortedItems } from "../hooks/useSortedItems";
import ItemRow from "./ItemRow";
import SortMenu from "./SortMenu";

const SORT_OPTIONS = [
  { value: "input", label: "Sort by input order" },
  { value: "description", label: "Sort by description" },
  { value: "packed", label: "Sort by packed status" },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState("input");
  const { items, clearItems } = usePackingList();
  const sortedItems = useSortedItems(items, sortBy);

  const handleClear = () => {
    if (!items.length) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) {
      clearItems();
    }
  };

  return (
    <section className="list">
      <ul>
        {sortedItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>

      <div className="actions">
        <SortMenu
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
        />
        <button type="button" onClick={handleClear} disabled={!items.length}>
          Clear list
        </button>
      </div>
    </section>
  );
}
