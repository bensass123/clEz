//craigslist scraper
'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var jsonArray = [];

//example URL		https://charlotte.craigslist.org/search/cta?srchType=T&bundleDuplicates=1&search_distance=60&postal=28277&min_price=3000&max_price=5500&auto_make_model=honda&min_auto_year=1999&max_auto_miles=160000&auto_title_status=1


var clSearch = (postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran) => {
	//will not add auto tran if false
	var transmission = '';
	var today = '';
	if (onlyAutoTran) {transmission = '&auto_transmission=2'}
	if (postedToday) {today = '&postedToday=1'}

	return 'https://charlotte.craigslist.org/search/cta?srchType=T' + today +'&bundleDuplicates=1&search_distance=60&postal=28277&min_price='+minPrice+'&max_price=' 
 + maxPrice + '&auto_make_model='+ make +'&min_auto_year='+minyear+'&max_auto_miles=' + maxMiles + '&auto_title_status=1' + transmission;
}


var doSearch = (postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran) => {

		
		var url = clSearch(postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran);

		request(url, function(error, response, html){
		    if (error) throw error;

		    else{
		        console.log('no error');
		        var $ = cheerio.load(html);
		        // console.log(html)

		        var price, title, href;
		        var json = { price: '', title: '', href: '', make: ''};

		        var test = $('div.content#sortable-results').children('ul.rows');

		        //.children('li.result-row').children('p.result-info');



		        for (var i = 0; i <test.length; i++) {
		        	var testA = test[i]['children'];
		        	console.log(testA);
		        	// console.log(testA);
		        	for (var x = 1; x <testA.length; x+=2) {
		        		href = testA[x]['children'][3]['children'][5]['attribs']['href'];
		        		title = testA[x]['children'][3]['children'][5]['children'][0].data;
		        		price = testA[x]['children'][3]['children'][7]['children'][1]['children'][0].data;
		        		json = {price: price, title: title, href: href, make: make}
		        		// console.log(json);
		        		jsonArray.push(json);
		        	}
		        }
		 }

	})
	setTimeout(function(){createFile(make + 'Initial.json', jsonArray)}, 10000);
}


function createFile(filename, json){
		fs.appendFile(filename, JSON.stringify(json, null, 4), function(err){

		    console.log('File successfully written! - Check your project directory for the output file');

		});
		console.log(json.length);
		console.log('createfilerun');
}


// console.log(clSearch(false, 3000, 5500, 'honda', 1999, 160000, false))


// (postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran)
doSearch(false, 3000, 5500, 'honda', 1999, 160000, false);
// doSearch(false, 3000, 5500, 'toyota', 1999, 160000, false);
// doSearch(true, 3000, 5500, 'mazda', 1999, 160000, false);
// doSearch(true, 3000, 5500, 'nissan', 1999, 160000, false);


// setTimeout(function(){console.log()},1000000);