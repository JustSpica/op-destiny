import { model, Schema, Types } from 'mongoose';

type UserGachaType = {
  userName: string;
  userId: string;
  cards: Types.ObjectId[];
  timestamp: number;
}

export const UserGachaModel = model('userGacha', new Schema<UserGachaType>({
  userName: {
    type: String,
    required: true,
    unique: false
  },
  userId: {
    type: String,
    required: true,
    unique: false
  },
  cards: {
    type: [Types.ObjectId],
    required: true,
    unique: false
  },
  timestamp: {
    type: Number,
    required: false,
    unique: false
  },
}))