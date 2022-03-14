import { model, Schema } from 'mongoose';

export type LevelModelType = {
  userName: string;
  userId: string;
  level: number;
  xp: number;
  lastMessage: number;
}

export const LevelModel = model('level', new Schema({
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
  level: {
    type: Number,
    required: false,
    unique: false
  },
  xp: {
    type: Number,
    required: false,
    unique: false
  },
  lastMessage: {
    type: Number,
    required: false,
    unique: false
  }
}))