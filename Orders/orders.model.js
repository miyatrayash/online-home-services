/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
	source: { type: String, required: true },
	category: { type: String, required: true },
	price: { type: Number, required: true },
	person: { type: Number, required: true },
	serviceID: { type: Schema.Types.ObjectId, ref: "Appliances", required: true },
	ownerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
	customerID: { type: Schema.Types.ObjectId, ref: "User", required: true },
	createdDate: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: ["Pending", "Accepted", "Finished"],
		default: "Pending",
	},
});

schema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	
});

module.exports = mongoose.model("Order", schema);
