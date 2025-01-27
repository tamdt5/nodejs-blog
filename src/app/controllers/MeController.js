const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.countDocumentsDeleted(),
            Course.find({}).sortable(req),
        ])
            .then(([deletedCount, courses]) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                    deletedCount,
                }),
            )
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
