import { model, Schema } from 'mongoose';

export interface IKeys {
  id: number;
  name: string;
}

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
  boosterTime?: number;
  keys?: IKeys[];
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
  keys: {
    type: Array,
    required: false,
    unique: false,
  },
  timestamp: {
    type: Number,
    required: true,
    unique: false,
  }
}))