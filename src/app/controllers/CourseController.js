const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        const slug = req.params.slug;
        Course.findOne({ slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect(`/courses/${course.slug}`))
            .catch((error) => {
                console.log(123);
            });
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restore(req, res, next) {
        Course.updateOne({ _id: req.params.id }, { deleted: false })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    force(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({
                    _id: { $in: req.body.courseIdList.split(',') },
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restoreAll':
                Course.updateOne(
                    { _id: { $in: req.body.courseIdList.split(',') } },
                    { deleted: false },
                )
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceAll':
                Course.deleteOne({
                    _id: { $in: req.body.courseIdList.split(',') },
                })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CourseController();
