import { model, Schema } from 'mongoose';

export interface IUserModel {
  idUser: string;
  name: string;
  cards: string[];
  coins: number;
  level: {
    value: number;
    xp: number;
    timestamp: number;
  };
  dice?: {
    timestamp: number;
  }
  boosterTime?: number;
  timestamp: number;
}

export const UserModel = model('users', new Schema<IUserModel>({
  idUser: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  cards: {
    type: [String],
    required: true,
    unique: false,
  },
  coins: {
    type: Number,
    required: true,
    unique: false,
  },
  level: {
    type: Object,
    required: true,
    unique: false,
  },
  boosterTime: {
    type: Number,
    required: false,
    unique: false,
  },
  dice: {
    type: Object,
    required: false,
    unique: false,
  },
  timestamp: {
    type: Number,
    required: true,
    unique: false,
  }
}))