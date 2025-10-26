import { useId, useState } from "react";
import { usePackingList } from "../context/PackingListContext";
import { createPackingItem } from "../utils/createPackingItem";

const quantityOptions = Array.from({ length: 20 }, (_, index) => index + 1);

export default function ItemForm() {
  const descriptionId = useId();
  const quantityId = useId();
  const { addItem } = usePackingList();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      return;
    }

    addItem(createPackingItem({ description: trimmedDescription, quantity }));
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3 id={`${descriptionId}-label`}>What do you need for your 😍 trip?</h3>
      <select
        id={quantityId}
        aria-label="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {quantityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        id={descriptionId}
        type="text"
        aria-label="Item description"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        autoComplete="off"
      />
      <button type="submit">Add</button>
    </form>
  );
}
