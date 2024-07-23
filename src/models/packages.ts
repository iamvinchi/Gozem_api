import mongoose, { Schema, Document } from 'mongoose';

interface Location {
    lat: number;
    lng: number;
  }
// Define interface for Document
interface IPackage extends Document {
  package_id: string;
  active_delivery_id: string;
  description:string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location:Location;
  to_name:string;
  to_address: string;
  to_location: Location
}

// Define schema
const PackageSchema: Schema = new Schema({
  package_id: { type: String, required: true },
  active_delivery_id: { type: String },
  description: { type: String, required: true },
  weight: { type: Number },
  width: { type: Number },
  height: { type: Number },
  depth: { type: Number},
  from_name: { type: String, required: true },
  from_address: { type: String, required: true },
  from_location:{
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  to_name: { type: String, required: true },
  to_address: { type: String, required: true },
  to_location:{
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  }
});

// Define and export model
export default mongoose.model<IPackage>('Package', PackageSchema);
