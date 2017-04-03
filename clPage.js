


var h = require('./honda');

var array = [];

var start;




urlGen = () => {
	for (var i = 0; i < h.length; i++) {
		if (h[i].href[1]==='/') {
			start = 'https:'
		} else {
			start = 'https://charlotte.craigslist.org';
		}
		if (h[i].href){}
		var url = start + h[i].href;
		array.push(url);
	}
}

title = () => {
	var t;
	for (var i = 0; i < h.length; i++) {
		t = h[i].title;
		array.push(t);
	}
}


price = () => {
	var p;
	for (var i = 0; i < h.length; i++) {
		p = h[i].price;
		array.push(p);
	}
}

urlGen();

setTimeout(function(){
	// for (i in array){
		console.log(array)
	// }
}	, 200);
