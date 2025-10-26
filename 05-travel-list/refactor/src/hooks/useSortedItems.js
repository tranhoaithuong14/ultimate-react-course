import { useMemo } from "react";

const sortStrategies = {
  input: (items) => items,
  description: (items) =>
    [...items].sort((a, b) => a.description.localeCompare(b.description)),
  packed: (items) =>
    [...items].sort((a, b) => Number(a.packed) - Number(b.packed)),
};

export function useSortedItems(items, sortBy) {
  return useMemo(() => {
    const strategy = sortStrategies[sortBy];
    return strategy ? strategy(items) : items;
  }, [items, sortBy]);
}
