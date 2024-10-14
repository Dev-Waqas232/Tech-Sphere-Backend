import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import Product from "../models/product";

const createProduct = async (req: Request, res: Response) => {
  const { title, category, description, price } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file!.path);
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

const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 4, category } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const query = category ? { category: category } : {};

  try {
    const products = await Product.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(query);

    return res.status(200).json({
      message: "Fetched Products",
      ok: true,
      data: {
        products,
        meta: {
          currentPage: pageNumber,
          totalPage: Math.ceil(totalProducts / limitNumber),
          totalProducts,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

export { createProduct, getProducts };
