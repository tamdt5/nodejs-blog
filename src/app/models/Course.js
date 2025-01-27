const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        slug: { type: String, slug: 'name', unique: true },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
    },
    {
        _id: false,
        timestamps: true,
    },
);

Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);

        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// Add plugins
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    overrideMethods: ['delete', 'countDocuments'],
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
