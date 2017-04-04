var cheerio = require('cheerio');
var request = require('request');

request('https://charlotte.craigslist.org/cto/6072818720.html', function(error, response, html){
	$ = cheerio.load(html)

	console.log($('.attrgroup')['1']['children'])
		// ['children'][8].innerText)

})

setTimeout(function(){}, 1000000000)