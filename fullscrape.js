//fullscrape.js

//   1.    scrape and populate json with  "price","title","href","make"
// 		**pass options -> (postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran) 
// 			to craigslistScrape.js

//   2.    take json file and pass to fixjson.js to correct href's

//   3.    pass resulting file to clImg.js to add images array and text data 



var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var make = process.argv[2];

//capitalize the first letter of make
make = make.charAt(0).toUpperCase() + make.slice(1);

//this will need to be called after the first createFile
//this will need to be called after the second createFile


var fs = require('fs');
var rp = require('request-promise');

var jsonArray = [];
var array = [];
var newone;

//setup empty pics arrays
var tempPics = [];
var picsArr = [];


var text, miles;

var json = {index: 0, array: [], text : ''};




clSearch = (postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran) => {
	//will not add auto tran if false
	var transmission = '';
	var today = '';
	if (onlyAutoTran) {transmission = '&auto_transmission=2'}
	if (postedToday) {today = '&postedToday=1'}

	return 'https://charlotte.craigslist.org/search/cta?srchType=T' + today +'&bundleDuplicates=1&search_distance=60&postal=28277&min_price='+minPrice+'&max_price=' 
 + maxPrice + '&auto_make_model='+ make +'&min_auto_year='+minyear+'&max_auto_miles=' + maxMiles + '&auto_title_status=1' + transmission;
}


doSearch = (postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran) => {

		// var jsonArray = [];
		var url = clSearch(postedToday, minPrice, maxPrice, make, minyear, maxMiles, onlyAutoTran);
		console.log(url)
		request(url, function(error, response, html){
		    if (error) throw error;

		    else{
		        console.log('no error');
		        var $ = cheerio.load(html);
		        // console.log(html)

		        var price, title, href, miles;
		        var json = { price: '', title: '', href: '', make: ''};

		        var test = $('div.content#sortable-results').children('ul.rows');

		        //.children('li.result-row').children('p.result-info');



		        
		        	var testA = test[0]['children'];
		        	// console.log(testA);
		        	for (var x = 1; x <testA.length; x+=2) {
		        		href = testA[x]['children'][3]['children'][5]['attribs']['href'];
		        		title = testA[x]['children'][3]['children'][5]['children'][0].data;
		        		price = testA[x]['children'][3]['children'][7]['children'][1]['children'][0].data;
		        		json = {price: price, title: title, href: href, make: make}
		        		// console.log(json);
		        		jsonArray.push(json);
		    			// console.log('doSearch json array length:')
						// console.log(jsonArray.length)
		        	}
		        
		 }

	})
	
}

// end of 1st script

// start of 2nd script


//fixing urls
urlGen = (picHref) => {
	
		if (picHref[1] == '/') {
			return 'https:'  + picHref;
		} else {
			return 'https://charlotte.craigslist.org'  + picHref;
		}

}


 //setting fixed urls
doit = () => {
	console.log('doit')
	console.log(jsonArray.length)
	for (var i = 0; i < jsonArray.length; i++){
		newone = urlGen(jsonArray[i].href);
		jsonArray[i].href = newone;
		
	}
}


doImg = (url, index) => {
	var current;
	var picsJson, textJson;

	rp(url).then(function (html) {
	    	var $ = cheerio.load(html);
			var script = $('script');
			
			current = script[2].children[0].data;
			picsJson = JSON.parse(current.substr(19).slice(0, -5));
			text = $('#postingbody')[0]['children'][2].data;
			// miles = $('.attrgroup')[1]['children'][8].innerText;
			// console.log(text);
			tempPics = [];
			tempText = '';
			for (var i = 0; i < picsJson.length; i++) {
				// console.log(a[i].url);
				tempPics.push(picsJson[i].url);
			}
			
			json = {index: index, array: tempPics, text: text};
			picsArr.push(json);
	    })
	    .catch(function (err) {
	    	console.log('fail  ' + url);
	    });
}



getAllImgs = () => {
	for (var i = 0; i < jsonArray.length; i++){
		var h = doImg(jsonArray[i].href, i);
	}
}

//populating array correctly,  matching indices
fixImgs = () => {
	for (i = 0; i < picsArr.length; i++){
		var ind = picsArr[i].index;
		console.log(ind);
		try {
			//pushing in index and pics array
			console.log(picsArr[i]);
			jsonArray[ind].pics = picsArr[i];
		}
		catch (e) {
			console.log(e.message);
		}
	}
}

function createFile(){
	
		fs.appendFile(make + 'Final.json', JSON.stringify(jsonArray, null, 4), function(err){
		    console.log(make + ' File successfully written! - Check your project directory for the output file');
		});

		console.log('createfilerun');
		console.log('cars found:')
		console.log(jsonArray.length)
}




var init = () => {
	doSearch(false, 3000, 5500, make, 1999, 140000, false);
	setTimeout(function(){doit();
		// console.log(jsonArray);
		console.log('do search done');}, 5000);

	setTimeout(function(){getAllImgs();
		// console.log(jsonArray);
		console.log('doit done');}, 10000);

	setTimeout(function(){fixImgs();
		console.log('get all imgs done');
		console.log('get imgs done');
		console.log('fix imgs done');}, 15000);	

	setTimeout(function(){createFile();
		// console.log(jsonArray);
		console.log('create file done');}, 20000);
	console.log(jsonArray.length)
}

init();


