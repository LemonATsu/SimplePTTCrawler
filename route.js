const Article = require('./controller/Article'),
      Content = require('./controller/Content');

module.exports = function(app) {

    app.get('/', Article.list);
    app.param('id', Content.load);
    app.get('/content/:id', Content.show);  
};