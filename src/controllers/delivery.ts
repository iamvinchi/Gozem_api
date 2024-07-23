import express from'express';
import Package from '../models/delivery';
import {getAllDeliveries, getDeliveryById, updateDelivery, deleteDelivery, createDelivery} from "../services/delivery"

const router = express.Router()

router.get('/', async (req, res) => {
  const response = await getAllDeliveries()
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params

  const response = await getDeliveryById(id)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.post('/:id', async (req, res) => {
  console.log(req.params, req.body)
  const {id} = req.params
  
  const response = await createDelivery(id, req.body)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const body = req.body
  const response = await updateDelivery(id, body)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params
  const response = await deleteDelivery(id)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

export default router;
