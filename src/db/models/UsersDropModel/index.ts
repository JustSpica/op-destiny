import { model, Schema } from 'mongoose';

export type UsersDropModelType = {
  userName: string;
  userId: string;
  cards: string[];
  timestamp: number;
}

export const UsersDropModel = model('drops', new Schema<UsersDropModelType>({
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
    type: [String],
    required: true,
    unique: false,
  },
  timestamp: {
    type: Number,
    required: false,
    unique: false
  }
}))