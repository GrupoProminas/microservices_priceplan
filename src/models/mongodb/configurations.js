export default {
    collection: 'Configurations',
    fields: {
        name: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        value: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    options: {
        timestamps: true
    }
}