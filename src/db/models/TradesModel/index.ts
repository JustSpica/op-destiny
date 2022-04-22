import { model, Schema } from 'mongoose';

export interface ITradeModel {
  idTrade: string;
  idCard: string;
  buyerUser: {
    name: string;
    id: string;
  };
  vendorUser: {
    name: string;
    id: string;
  };
  amount: number;
}

export const TradesModel = model('trades', new Schema<ITradeModel>({
  idTrade: {
    type: String,
    require: true,
    unique: true,
  },
  idCard: {
    type: String,
    require: true,
    unique: false,
  },
  buyerUser: {
    type: Object,
    required: true,
    unique: false,
  },
  vendorUser: {
    type: Object,
    required: true,
    unique: false,
  },
  amount: {
    type: Number,
    required: true,
    unique: false,
  },
}))