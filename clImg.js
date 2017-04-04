var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var rp = require('request-promise');

var make = 'honda';


var h20 = require('./' + make + 'FixedHref.json');

//setup empty pics arrays
var tempPics = [];
var picsArr = [];

//setup empty text arrays
var text;

var json = {index: 0, array: [], text : ''};

doit = (url, index) => {
	var current;
	var picsJson, textJson;

	rp(url).then(function (html) {
	    	var $ = cheerio.load(html);
			var script = $('script');
			
			current = script[2].children[0].data;
			picsJson = JSON.parse(current.substr(19).slice(0, -5));
			text = $('#postingbody')[0]['children'][2].data;
			console.log($('.attrgroup'));
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




for (var i = 0; i < h20.length; i++){
	var h = doit(h20[i].href, i)	
}

function createFile(){
		fs.appendFile(make + 'Final.json', JSON.stringify(h20, null, 4), function(err){

		    console.log('File successfully written! - Check your project directory for the output file');

		});
		console.log('createfilerun');
}

//populating array correctly
setTimeout(function(){
	// console.log(picsArr)
	for (i = 0; i < picsArr.length; i++){
		var ind = picsArr[i].index;
		// console.log(ind)
		try {
			//pushing in index and pics array
			h20[ind].pics = picsArr[i];
			//pushing in innerText
			// h20[ind].text = 
			// console.log(h20[ind]);
		}
		catch (e) {
			console.log(e.message);
		}
	}
	}, 6000)

setTimeout(createFile, 15000)

setTimeout(function(){console.log(h20)}, 8000)
