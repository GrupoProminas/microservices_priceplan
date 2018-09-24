export default {
    collection: 'Tags',
    fields: {
        name: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    options: {
        timestamps: true
    }
}