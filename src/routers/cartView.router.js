import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const router = Router();

router.get('/', async (req, res) => {
    const cid = req.session.user.cart;
    res.redirect(`/cart/${cid}`);
});

router.get('/:cid', async (req, res) => {
    const cid = req.session.user.cart;
    console.log(cid);
    const cart = await cartModel.findById(cid).populate('products._id');
    console.log(cart);
    res.render('cart', cart );
});

export default router;