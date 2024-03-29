const express = require('express');

const router = express.Router();

const { Order } = require('../models/order');
const { OrderItem } = require('../models/orderItem');

router.get('/', async (req, res) => {
	try {
		const orderList = await Order.find().populate('user', 'username').sort({ dateOrdered: -1 });

		res.status(200).json(orderList);
	} catch (e) {
		res.status(500).json({ success: false });
	}
});

router.get(`/:id`, async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate('user', 'username')
			.populate({
				path: 'orderItems',
				populate: {
					path: 'product',
					populate: 'category',
				},
			});

		if (!order) {
			res.status(404).json({ success: false });
		}

		res.status(200).json(order);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get('/get/totalsales', async (req, res) => {
	const totalSales = await Order.aggregate([{ $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }]);

	if (!totalSales) {
		return res.status(400).json({ message: 'The order sales cannot be generated' });
	}

	res.status(200).json({ totalsales: totalSales.pop().totalsales });
});

router.get(`/get/count`, async (req, res) => {
	try {
		const orderCount = await Order.countDocuments();

		res.status(200).json({ orderCount: orderCount });
	} catch (e) {
		res.status(500).json({ success: false });
	}
});

router.get(`/get/userorders/:userid`, async (req, res) => {
	try{
		const userOrderList = await Order.find({ user: req.params.userid })
		.populate({
			path: 'orderItems',
			populate: {
				path: 'product',
				populate: 'category',
			},
		})
		.sort({ dateOrdered: -1 });

	if (!userOrderList) {
		res.status(404).json({ message: 'not fund order' });
	}

	res.status(200).json(userOrderList);
	}catch(e){
		res.status(500).json({ success: false });
	}
});

router.post('/', async (req, res) => {
	const orderItemsIds = Promise.all(
		req.body.orderItems.map(async (orderItem) => {
			let newOrderItem = new OrderItem({
				quantity: orderItem.quantity,
				product: orderItem.product,
			});

			newOrderItem = await newOrderItem.save();

			return newOrderItem._id;
		})
	);
	const orderItemsIdsResolved = await orderItemsIds;

	const totalPrices = await Promise.all(
		orderItemsIdsResolved.map(async (orderItemId) => {
			const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
			const totalPrice = orderItem.product.price * orderItem.quantity;
			return totalPrice;
		})
	);

	const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

	let order = new Order({
		orderItems: orderItemsIdsResolved,
		shippingAddress1: req.body.shippingAddress1,
		shippingAddress2: req.body.shippingAddress2,
		city: req.body.city,
		zip: req.body.zip,
		country: req.body.country,
		phone: req.body.phone,
		status: req.body.status,
		totalPrice: totalPrice,
		user: req.body.user,
	});
	order = await order.save();

	if (!order) return res.status(400).send('the order cannot be created!');

	res.send(order);
});

router.put('/:id', async (req, res) => {
	try{
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{
				status: req.body.status,
			},
			{ new: true }
		);
	
		if (!order) return res.status(400).send('the order cannot be update!');
	
		res.send(order);
	}catch(e){
		res.status(500).json({ success: false });
	}

});

router.delete('/:id', async (req, res) => {
	try{
		const order = await Order.findByIdAndRemove(req.params.id);

		if(order){
			const orderItem = order.orderItems;

			orderItem.map(async (orderItem) => {
				await OrderItem.findByIdAndRemove(orderItem);
			});
			
			return res.status(200).json({ success: true, message: 'the order is deleted!' });
		} else {
			return res.status(404).json({ success: false, message: 'order not found!' });
		}
	}catch(e){
		return res.status(500).json({ success: false, error: err });
	}
});

module.exports = router;
