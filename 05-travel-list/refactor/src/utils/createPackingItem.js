const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function createPackingItem({ description, quantity }) {
  return {
    id: generateId(),
    description: description.trim(),
    quantity: Number(quantity) || 1,
    packed: false,
  };
}
