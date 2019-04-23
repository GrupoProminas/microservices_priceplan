export default {
    collection: 'PromotionCourses',
    fields    :    {
        name: {
          type: String,
          required: true
        },
        discountPercentage: {
            type: Number,
            allowNull: false
        },
        regulation: {
            type: String,
            allowNull: false
        },
        tags: {
           type: [String],
            required: true
        },
        dateStart: {
            type: Date,
            allowNull: false
        },
        dateEnd: {
            type: Date,
            allowNull: false
        },
        isActive: {
            type: Boolean,
            default: true,
            allowNull: false
        }
    },
    options   : {
        timestamps: true
    }
};