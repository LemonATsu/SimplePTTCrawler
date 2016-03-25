const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const ArticleSchema = new Schema({
    _id         : {type : String, trim : true, required : true},
    title       : {type : String, trim : true, required : true},
    author      : {type : String, trim : true, required : true},
    time        : {type : String, trim : true, required : true},
}, { timestamps: { createdAt: 'created_at' } });

ArticleSchema.methods = {

};

ArticleSchema.statics = {

    load : function (_id) {

        return this.findOne({ _id})
               .populate('owner', 'name')
               .exec();
    },

    list : function (options) {
        const criteria = options.criteria || {};
        return this.find(criteria)
               .sort({'created_at' : -1})
               .limit(50)
               .exec();
    }
};

mongoose.model('Article', ArticleSchema);
