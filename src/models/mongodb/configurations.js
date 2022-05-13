export default {
    collection: 'Configurations',
    fields: {
        name: {
            type: String,
            required: true,
            unique: true
        },
        value: {
            type: String,
            required: true
        },
        description: String,
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