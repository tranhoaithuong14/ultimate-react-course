import { useMemo } from "react";

export function usePackingStats(items) {
  return useMemo(() => {
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

    return { numItems, numPacked, percentage };
  }, [items]);
}
