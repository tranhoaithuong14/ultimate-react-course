import { memo, useMemo } from "react";
import { usePackingList } from "../context/PackingListContext";

function ItemRow({ item }) {
  const { toggleItem, deleteItem } = usePackingList();

  const label = useMemo(
    () => `${item.quantity} ${item.description}`,
    [item.quantity, item.description]
  );

  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => toggleItem(item.id)}
        aria-label={`Mark ${label} as packed`}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : undefined}>
        {label}
      </span>
      <button type="button" onClick={() => deleteItem(item.id)} aria-label={`Remove ${label}`}>
        ❌
      </button>
    </li>
  );
}

ItemRow.displayName = "ItemRow";

export default memo(ItemRow);
