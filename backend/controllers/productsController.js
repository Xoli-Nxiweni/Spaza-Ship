import Products from "../models/products.js";
import multer from 'multer';
import path from 'path';

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename the file to avoid duplicates
    },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

// Middleware to handle file uploads in routes
export const uploadProductImages = upload.array('images'); // Use 'images' as the field name for multiple file uploads

// Add a new product
const addProduct = async (req, res) => {
    try {
        // Extract other product details from the request body
        const { name, description, price, category, quantity } = req.body;

        // Handle images
        const images = req.files ? req.files.map(file => file.path) : []; // Get file paths

        // Create the new product in the database
        const newProduct = await Products.create({
            name,
            description,
            price,
            category,
            quantity,
            images // Save the array of image paths
        });

        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occurred while trying to create a product" });
    }
};

// View all products with pagination
const viewProducts = async (req, res) => {
    try {
        const { page = 1, pageSize = 5 } = req.query;
        const skip = (page - 1) * pageSize;

        const totalProducts = await Products.countDocuments();
        const products = await Products.find()
            .skip(skip)
            .limit(Number(pageSize));

        res.status(200).json({ total: totalProducts, page: Number(page), pageSize: Number(pageSize), products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occurred while trying to view all products" });
    }
};

// View a single product by ID
const viewProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occurred while trying to view a product" });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true }); // Return the updated document

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occurred while trying to update a product" });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: `Cannot find a product with ID: ${id}` });
        }

        res.status(200).json({ message: "Product successfully deleted!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error occurred while trying to delete a product" });
    }
};

export default {
    addProduct,
    viewProducts,
    viewProduct,
    updateProduct,
    deleteProduct,
};
