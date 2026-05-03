/**
 * cart schema create
 */
import mongoose from 'mongoose';

const cartSchema = new  mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
   },
    products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
})

//model create
const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;