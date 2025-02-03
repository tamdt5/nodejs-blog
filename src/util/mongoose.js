module.exports = {
    multipleMongooseToObject: function (mongooses) {
        return mongooses.length === 1
            ? mongooses
            : mongooses.map((mongoose) => JSON.parse(JSON.stringify(mongoose)));
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    reformatPagination: function (mongoose) {
        const paginationObj = {
            totalDocs: mongoose.totalDocs,
            offset: mongoose.offset,
            limit: mongoose.limit,
            totalPages: mongoose.totalPages,
            page: mongoose.page,
            pagingCounter: mongoose.pagingCounter,
            hasPrevPage: mongoose.hasPrevPage,
            hasNextPage: mongoose.hasNextPage,
            prevPage: mongoose.prevPage,
            nextPage: mongoose.nextPage,
        };

        return paginationObj;
    },
};
