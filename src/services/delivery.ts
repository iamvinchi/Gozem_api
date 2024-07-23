import Delivery from '../models/delivery';
import PackageModel from '../models/packages';
import { v4 as uuidv4 } from 'uuid';

export const getAllDeliveries = async() => {
  try {
    const response = await Delivery.find().sort({ createdAt: -1 });
    return{
        status: true,
        data:response,
        message: `Deliveries fetched successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }
  }
};

export const getDeliveryById = async(id:string) => {
  try {
    const response = await Delivery.findOne({delivery_id:id})
    return{
        status: true,
        data:response,
        message: `Delivery fetched successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }  }
};

export const createDelivery = async(packageId:string, body:any) => {
  const { pickup_time } = body;
  console.log(packageId,pickup_time, "pickup_time")
  try {

    const newDelivery = new Delivery({
        delivery_id: uuidv4(),
        package_id:packageId,
        pickup_time
    });

    const delivery = await newDelivery.save();
    return{
        status: true,
        data:delivery,
        message: `Delivery created successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    } 
  }
};

export const updateDelivery = async(id:string, body:any) => {
  try {
    const updated = await Delivery.findByIdAndUpdate({_id: id}, {...body})
    return{
        status: true,
        data:updated,
        message: `Delivery updated successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }  }
};

export const deleteDelivery = async(id:string) => {
  try {
    const deleted = await Delivery.findByIdAndDelete({_id: id})
    return{
        status: true,
        data:deleted,
        message: `Delivery deleted successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }
  }
};
