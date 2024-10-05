import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import Product from "../models/product";

const createProduct = async (req: Request, res: Response) => {
  const { title, category, description, price } = req.body;
  try {
    if (!req.file)
      return res.status(404).json({ message: "Image is required", ok: false });

    const result = await cloudinary.uploader.upload(req.file.path);
    const product = await Product.create({
      title,
      category,
      description,
      price,
      imageUrl: result.secure_url,
    });
    res
      .status(201)
      .json({ message: "Product Created!", ok: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

export { createProduct };
