// src/models/productModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Product {
    productID: string;
    link: string;
    title: string;
    price: number;
}

export interface ProductDocument extends Product, Document { }

const productSchema = new Schema<Product>({
    productID: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
});

export default mongoose.model<ProductDocument>('Product', productSchema);
