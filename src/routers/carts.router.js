import { Router } from "express";
import cartModel from "../models/cart.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try{
        const carts = await cartModel.find();
        res.json({ carts:  carts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try{
        // const newId = new mongo.ObjectId();
        // console.log(newId);
        // const cart = await cartModel.create({ products: []})
        const cart = new cartModel();
        // cart._cid = new mongoose.Types.ObjectId();
        await cart.save();
        res.status(201).json({ message: 'Cart created successfully', cartId: cart._cid });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:cid', async (req, res) => {
    try{
        const cart = await cartModel.findById(req.params.cid);
        res.json( { cart:  cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try{
        const { quantity } = req.body;
        if (!quantity) return res.status(400).json({ message: 'Some fields are missing' });
        const cart = await cartModel.findById(req.params.cid);
        const i = cart.products.findIndex(product => product._id == req.params.pid)
        if (i!=-1) cart.products[i].quantity += quantity;
        else cart.products.push({ _id: req.params.pid, quantity: quantity });
        await cart.save();
        res.status(200).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try{
        const successfully = await cartModel.findByIdAndDelete(req.params.cid);
        res.json( {message: successfully} )
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;