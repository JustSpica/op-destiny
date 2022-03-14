import { model, Schema, Types } from 'mongoose';

export type GachaObjectType = {
  _id: Types.ObjectId;
  name: string;
  anime: string;
  amount: number;
  rank: number;
  link: string;
}

export const CardModel = model('card', new Schema<GachaObjectType>({
  name: {
    type: String,
    required: true,
    unique: false
  },
  anime: {
    type: String,
    required: true,
    unique: false,
  },
  amount: {
    type: Number,
    required: true,
    unique: false
  },
  rank: {
    type: Number,
    required: true,
    unique: false
  },
  link: {
    type: String,
    required: true,
    unique: true
  }
}))