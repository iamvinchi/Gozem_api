import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';

interface Location {
    lat: number;
    lng: number;
  }

interface IDelivery extends Document {
  delivery_id: string;
  package_id: string;
  pickup_time: Date;
  start_time:Date;
  end_time:Date;
  location:Location;
  status: string
}

const DeliverySchema: Schema = new Schema({
  delivery_id: { type: String, required: true },
  package_id: { type: String, required: true },
  pickup_time: { type: Date },
  start_time: { type: Date },
  end_time: { type: Date },
  location: {
    lat: { type: String },
    lng: { type: String },
  },
  status:{
    type: String,
    enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
    default: 'open'
}
})

export default mongoose.model<IDelivery>('Delivery', DeliverySchema);
