// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/productModel';

export const getProductList = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
