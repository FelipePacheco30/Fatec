import mongoose, { Document, Schema } from 'mongoose';

export interface IShoppingItem extends Document {
  nome: string;
  quantidade: number;
  valor: number;
  comprado: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const shoppingItemSchema = new Schema<IShoppingItem>(
  {
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true, default: 1 },
    valor: { type: Number, required: true, default: 0 },
    comprado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ShoppingItem = mongoose.model<IShoppingItem>('ShoppingItem', shoppingItemSchema, 'shoppingitems');
