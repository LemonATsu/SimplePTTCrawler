const cheerio = require('cheerio'),
      request = require('request'),
      mongoose   = require('mongoose');



const Article = require('./controller/Article'),
      Content = require('./controller/Content');


const ptt_url = 'http://www.ptt.cc/bbs/Gossiping/index.html',
      base_url = 'http://www.ptt.cc',
      test_url = '/bbs/Gossiping/M.1458873683.A.203.html';

const opt = 
{
    'Cookie' : 
    'over18=1;'
};

function loadArticle(article_url) {
    'use strict';
    request({
        url : base_url + article_url,
        headers : opt
    }, function(error, response, html) {
        let $ = cheerio.load(html);
        let a_data = {
            author   : $('div.article-metaline:nth-child(1) > span:nth-child(2)').text(),
            title    : $('div.article-metaline:nth-child(3) > span:nth-child(2)').text(),
            time     : $('div.article-metaline:nth-child(4) > span:nth-child(2)').text(),
        } 
        let c_data = {
            content  : '',
            comments : []
        };

        let id = article_url.split('/')[3];
        $('div.push').each(function (i, e) {
            let label = $(e).children().first().text();
            let text  = $(e).children().next().text();
            c_data.comments.push(label + text);
        });

        c_data.content = $('#main-content').children().remove().end().text();

        //console.log(comments);

        Article.insert(id, a_data);
        Content.insert(id, c_data);
    });
}

function crawl(url, count) {
    if(count > 0) {
        count--;
    } else {
        return;
    }
    console.log(url);
    request({
        url : url,
        headers : opt
    }, function(error, response, html) {
        'use strict';

        if(!error) {
            let $ = cheerio.load(html);
            let next_page = $('.btn-group.pull-right').children().first().next().attr('href');

            $('div.r-ent a').each(function (i, e) {
                loadArticle(($(e).attr('href')));
            });
            
            crawl(base_url + next_page, count);
        }
    });
}

function crawlArticle() {
    crawl(ptt_url, 3);
}

crawlArticle();

setInterval(function () {
    console.log('crawlll');
    crawlArticle();
}, 10000);
