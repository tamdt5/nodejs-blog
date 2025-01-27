const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        slug: { type: String, slug: 'name', unique: true },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: ['delete', 'countDocuments'],
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
