const express = require('express');
const router = express.Router();

const { Category } = require('../models/category');

router.get('/', async (req, res) => {
	try {
		const categoryList = await Category.find();

		res.status(200).json(categoryList);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const category = await Category.findById(req.params.id);

		if (!category) {
			return res.status(404).json({ message: 'Cannot find category' });
		}

		res.status(200).json(category);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.post('/', async (req, res) => {
	let category = new Category({
		name: req.body.name,
		icon: req.body.icon,
		color: req.body.color,
	});

	try {
		category = await category.save();

		res.status(201).json(category);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				icon: req.body.icon || category.icon,
				color: req.body.color,
			},
			{ new: true }
		);

		if (!category) {
			return res.status(404).json({ message: 'Cannot find category' });
		}

		res.status(200).json(category);
	} catch (e) {
		res.status(500).json({ success: false, error: e });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);

		if (!category) {
			return res.status(404).json({ success: false, message: 'Cannot find category' });
		}

		res.status(200).json({ success: true, message: 'Deleted category' });
	} catch (e) {
		res.status(500).json({ success: false, error: e });
	}
});

module.exports = router;