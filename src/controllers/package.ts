import express from'express';
import Package from '../models/packages';
import {getAllPackages, getPackageById, updatePackage, deletePackage, createPackage} from "../services/package"

const router = express.Router()

router.get('/', async (req, res) => {
  const response = await getAllPackages()
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.get('/:package_id', async (req, res) => {
  const {package_id} = req.params
  const response = await getPackageById(package_id)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.post('/', async (req, res) => {
  console.log(req.body, "aaa")
  const response = await createPackage(req.body)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.put('/:id', async (req, res) => {
  const {id} = req.params
  const body = req.body
  const response = await updatePackage(id, body)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params
  const response = await deletePackage(id)
  if(response.status){
    res.json(response)
  }else{
    res.status(500).json({message: response.message})
  }
});

export default router;
