const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs').promises;

const { Product } = require('../models/product');
const { Category } = require('../models/category');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/public/uploads');
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.split(' ').join('-');
		cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${fileName}`);
	},
});

const upload = multer({ storage: storage });

router.get(`/`, async (req, res) => {
	let filter = {};

	if (req.query.categories) {
		filter = { category: req.query.categories.split(',') };
	}
	try {
		const productList = await Product.find(filter).populate('category');

		res.status(200).json(productList);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).populate('category');

		if (!product) {
			return res.status(404).json({ message: 'Cannot find product' });
		}

		res.status(200).json(product);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get(`/get/count`, async (req, res) => {
	try {
		const productCount = await Product.countDocuments();

		if (!productCount) {
			return res.status(404).json({ success: false });
		}

		res.status(200).json({ productCount: productCount });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get(`/get/featured/:count`, async (req, res) => {
	const count = req.params.count ? req.params.count : 0;

	try {
		const products = await Product.find({ isFeatured: true }).limit(+count);

		if (!products) {
			return res.status(404).json({ success: false });
		}

		res.status(200).json(products);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.post(`/`, upload.single('productImage'), async (req, res) => {
	try {
		const category = await Category.findById(req.body.category);

		if (!category) {
			return res.status(404).json({ message: 'Invalid category' });
		}

		const file = req.file;

		if (!file) {
			return res.status(400).send('No image in the request');
		}

		const fileName = file.filename;
		const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

		let product = new Product({
			name: req.body.name,
			description: req.body.description,
			richDescription: req.body.richDescription,
			image: `${basePath}${fileName}`,
			brand: req.body.brand,
			price: req.body.price,
			category: req.body.category,
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
			isFeatured: req.body.isFeatured,
		});

		product = await product.save();

		res.status(201).json(product);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.put('/:id', upload.single('productImage'), async (req, res) => {
	try {
		const category = await Category.findById(req.body.category);

		if (!category) {
			return res.status(404).json({ message: 'Invalid category' });
		}

		const file = req.file;
		const fileName = file.filename;
		const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				description: req.body.description,
				richDescription: req.body.richDescription,
				image: `${basePath}${fileName}`,
				brand: req.body.brand,
				price: req.body.price,
				category: req.body.category,
				countInStock: req.body.countInStock,
				rating: req.body.rating,
				numReviews: req.body.numReviews,
				isFeatured: req.body.isFeatured,
			},
			{ new: true }
		);

		if (!product) {
			return res.status(400).send('the product cannot be created!');
		}

		res.status(201).json(product);
	} catch (e) {
		res.status(500).json({ success: false, error: e });
	}
});

router.put('/gallery-images/:id', upload.array('productImage', 10), async (req, res) => {
	try{
		const files = req.files;
		let imagesPaths = [];
		const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
	
		if (files) {
			files.map((file) => {
				imagesPaths.push(`${basePath}${file.filename}`);
			});
		}
	
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				galeryImages: imagesPaths,
			},
			{ new: true }
		);

		if (!product) {
			return res.status(404).json({ message: 'Cannot find product' });
		}
	
		res.status(200).json(product);
	}catch(e){
		res.status(500).json({ success: false, error: e });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		let productId = await Product.findById(req.params.id);
		let imageUrl = productId.image;

		imageUrl = imageUrl.replace('http://localhost:3000', '');

		fs.unlink(`.${imageUrl}`);

		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) {
			return res.status(404).json({ success: false, message: 'Cannot find product' });
		}

		res.status(200).json({ success: true, message: 'the ṕroduct is deleted!' });
	} catch (e) {
		res.status(500).json({ success: false, error: e });
	}
});

module.exports = router;
