//to test scrape the body of cl postings

var request = require('request');
var cheerio = require('cheerio');

var url = 'https://charlotte.craigslist.org/cto/6071769831.html';

request(url, function(error, response, html){
		    if (error) throw error;

		    else{
		        console.log('no error');
		        var $ = cheerio.load(html);

		        var body;

		        body = $('section.body').html();

		        console.log(body);
		    }

});