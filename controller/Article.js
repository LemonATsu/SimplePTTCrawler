const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Article  = mongoose.model('Article');

exports.insert = wrap(function * (id, data) {
    try {
        const val = data;

        Article.findOneAndUpdate({_id : id}, val , { upsert : true }, function (err, doc) {
            if(err) {
                console.log(err);
            }
        });

    } catch (err) {
        console.log(err);
        return err;
    } 
});

exports.list = wrap(function * (req, res) {
    const a = yield Article.list({});
    res.render('front.html', {'Articles' : a});
});

