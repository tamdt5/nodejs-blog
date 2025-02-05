module.exports = function sortMiddlewares(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        //WAY 1
        // res.locals._sort.enabled = true
        // res.locals._sort.type = req.query.type
        // res.locals._sort.column = req.query.column

        //WAY 2
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });

        // courseQuery = courseQuery.sort({
        //     [req.query.column]: req.query.type
        // })
    }

    next();
};
