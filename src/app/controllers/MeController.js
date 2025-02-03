const Course = require('../models/Course');
const {
    multipleMongooseToObject,
    mongooseCountAllRecords,
    reformatPagination,
} = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.countDocumentsDeleted(),
            Course.find({})
                .sortable(req)
                .paginate({}, function (err, res) {}),
        ])
            .then(([deletedCount, courses]) => {
                console.log(reformatPagination(courses));
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses.docs),
                    pagination: reformatPagination(courses),
                    deletedCount,
                });
            })
            .catch(next);
    }

    trashCourses(req, res, nexts) {
        Course.find({ deleted: true }).then((courses) => {
            res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses),
            });
        });
    }
}

module.exports = new MeController();
