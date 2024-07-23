import Package from '../models/packages';
import Delivery from '../models/delivery';
import { v4 as uuidv4 } from 'uuid';
import { getCoordinates } from '../utils/geocordinates';

export const getAllPackages = async() => {
  try {
    const response = await Package.find().sort({ createdAt: -1 });
    return{
        status: true,
        data:response,
        message: `Packages fetched successfully`
    }
  } catch (err) {
    console.error(err);
    return {
        status: false,
        message: `Server Error ${err}`
    }   
}
};

export const getPackageById = async(id:string) => {
  try {
    const pkg = await Package.findOne({package_id: id});
    const dlvry = await Delivery.findOne({package_id:id})
    const response = {
        package: pkg ? pkg : null,
        delivery: dlvry ? dlvry : null
    }
    return{
        status: true,
        data:response,
        message: `Package fetched successfully`
    }  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }   }
};

export const createPackage = async(body:any) => {
    const { description, sender_name, sender_address, receiver_name, receiver_address, weight, width, height, depth} = body;
    try {
        
        const address = '1600 Amphitheatre Parkway, Mountain View, CA'; // Replace with your desired address
        const testCordinates = await getCoordinates(address);

        const fromCordinates:any = await getCoordinates(sender_address);
        const toCordinates:any = await getCoordinates(receiver_address);
        console.log("testCordinates::", testCordinates,"fromCordinates::", fromCordinates, "toCordinates::", toCordinates)
    const newPackage = new Package({
        package_id: uuidv4(),
        description,
        weight,
        width,
        height,
        depth,
        from_name: sender_name,
        from_address: sender_address,
        from_location:{
          lat: fromCordinates?.lat?.toString(),
          lng: fromCordinates?.lng?.toString(),
        },
        to_name: receiver_name,
        to_address: receiver_address,
        to_location:{
          lat: toCordinates?.lat?.toString(),
          lng: toCordinates?.lng?.toString(),
        }
    });

    const pkg = await newPackage.save();
    return{
        status: true,
        data:pkg,
        message: `Package created successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }   }
};

export const updatePackage = async(id:string, body:any) => {
  try {
    const updated = await Package.findByIdAndUpdate({_id: id}, {...body})
    return{
        status: true,
        data:updated,
        message: `Package updated successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }   }
};

export const deletePackage = async(id:string) => {
  try {
    const deleted = await Package.findByIdAndDelete({_id:id})
    return{
        status: true,
        data:deleted,
        message: `Package deleted successfully`
    }
  } catch (err) {
    console.error(err);
    return{
        status: false,
        message: `Server Error ${err}`
    }   }
};

