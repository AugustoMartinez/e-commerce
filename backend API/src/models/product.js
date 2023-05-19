const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	richDescription: {
		type: String,
		default: '',
	},
	image: {
		type: String,
		default: '',
	},
	galeryImages: [
		{
			type: String,
		},
	],
	brand: {
		type: String,
		default: '',
	},
	price: {
		type: Number,
		default: 0,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	countInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
	rating: {
		type: Number,
		default: 0,
	},
	numReviews: {
		type: Number,
		default: 0,
	},
	isFeatured: {
		type: Boolean,
		default: false,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

productSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

exports.Product = mongoose.model('Product', productSchema);