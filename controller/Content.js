const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Content  = mongoose.model('Content');

exports.insert = wrap(function * (id, data) {
    try {
        const val = data;

        Content.findOneAndUpdate({_id : id}, val , { upsert : true }, function (err, doc) {
            if(err) {
                console.log(err);
            }
        });

    } catch (err) {
        console.log(err);
        return err;
    } 
});

exports.load = wrap(function * (req, res, next, id) {
    req.cont = yield Content.load(id);
    if(!req.cont) {
        return next(new Error('not found'));
    }
    next();
});

exports.show = function (req, res) {
    const data = req.cont;
    res.render('content.html', {content : data.content, comments : data.comments });
}