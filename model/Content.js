const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const ContentSchema = new Schema({
    _id         : {type : String, trim : true, required : true},
    content     : {type : String, default : '', trim : true},
    comments    : [String]

}, { timestamps: { createdAt: 'created_at' } });

ContentSchema.methods = {

};

ContentSchema.statics = {

    load : function (_id) {

        return this.findOne({ _id})
               .exec();
    },

};

mongoose.model('Content', ContentSchema);
