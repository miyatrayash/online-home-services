/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	name: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	address: { type: String, required: true },
	price: { type: Number, required: true },
	owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
	createdDate: { type: Date, default: Date.now },
	loc: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
});

schema.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

module.exports = mongoose.model("Appliances", schema);
