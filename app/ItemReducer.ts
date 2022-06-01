import { Category, Item } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

/**
 * 
 * 
 * 
  model Item {
  id      Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  name    String
  description String
  imageLink String
  category Category @relation(fields: [categoryId], references: [id])
  categoryId Int
  referencedItems ShoppingListItem[]
} 
*/

const initialState = {
  id: 1,
  name: "Banana",
  category: {
    name: "fruits",
  },
  imageLink:
    "data:image/jpeg;base64,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",
  description:
    'A banana is an elongated, edible fruit - botanically a berry - produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called "plantains", distinguishing them from dessert bananas.',
} as Item & { category: Category };

const ItemSlice = createSlice({
  name: "item",
  initialState: initialState,
  reducers: {
    showItem(state, action) {
      return (state = action.payload);
    },
  },
});

export const { showItem } = ItemSlice.actions;

export default ItemSlice.reducer;
