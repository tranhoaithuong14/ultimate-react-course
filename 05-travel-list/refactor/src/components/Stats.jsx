import { usePackingList } from "../context/PackingListContext";
import { usePackingStats } from "../hooks/usePackingStats";

export default function Stats() {
  const { items } = usePackingList();
  const { numItems, numPacked, percentage } = usePackingStats(items);

  if (numItems === 0) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
