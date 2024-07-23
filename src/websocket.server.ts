import { Server } from 'socket.io'
import Delivery from './models/delivery';


export const socketServer = async (server: any) => {
  console.log("init function")
  let io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
  });

  io.on('connect', (socket: any) => {
    console.log('Client connected');

    socket.on('location_changed', async (data: any) => {

      const { delivery_id, location } = data;

      const obj = await Delivery.findOneAndUpdate({ delivery_id }, { location }, { returnDocument: 'after' })
      const delivery_obj = {
        data: obj
      }

      console.log(delivery_obj, "delivery_obj")
      socket.emit("delivery_updated", delivery_obj);
    });

    socket.on('status_changed', async (data: any) => {
      const { delivery_id, status } = data;

      const obj = await Delivery.findOneAndUpdate({ delivery_id }, { status }, { returnDocument: 'after' })
      const delivery_obj = {
        data: obj,
        status
      }

      console.log(obj, "from status_changed")
      socket.emit("status_updated", delivery_obj);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}
