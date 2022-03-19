import { model, Schema } from 'mongoose';

export type CardsModelType = {
  idCard: string;
  name: string;
  anime: string;
  amount: number;
  tier: number;
  linkURL: string;
}

export const CardsModel = model('cards', new Schema<CardsModelType>({
  idCard: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: false
  },
  anime: {
    type: String,
    required: true,
    unique: false
  },
  amount: {
    type: Number,
    required: true,
    unique: false
  },
  tier: {
    type: Number,
    required: true,
    unique: false
  },
  linkURL: {
    type: String,
    required: true,
    unique: false
  },
}))