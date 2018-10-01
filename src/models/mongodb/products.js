import mongoose from 'mongoose';

export default {
    collection: 'Products',
    fields    :   {
        _productTypeAlias: {
           type: String,
           required: true
        },
        name: {
            type        : String,
            required    : true,
            index       : true
        },
        alias: {
            type        : String,
            unique      : true,
            required    : true
        },
        amount: {
          type: Number,
          required: true
        },
        metadata: {
          type: mongoose.SchemaTypes.Mixed
        },
        shipping: {
          packing: String,
          _codePacking: String,
          description: String,
          notes: String,
          weight: Number,
          cubage: Number,
          dimension: {
              width: Number,
              longitude: Number,
              height: Number,
              diameter: Number
          },
            additionalService: {
                ownHand: Boolean,
                receiptNotice: Boolean,
                declaredValue: Boolean
            }
        },
        isActive: {
            type        : Boolean,
            required    : true,
            default     : true,
            index       : true
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};