import mongoose, { Schema, Document } from "mongoose";

export interface ICliente extends Document {
  nome: string;
  email: string;
  telefone: string;
  criadoEm: Date;
}

const ClienteSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model<ICliente>("Cliente", ClienteSchema);
