var i = 0, howManyTimes = 60;

	var scroll = () => {
		$('#fillButton_' + i).trigger('click');
		// $('#delete_'+i).trigger('click');
		i++;
		if(i < howManyTimes) {
			setTimeout(scroll, 4500);
		} else { 
			i = 0;
			setTimeout(scroll, 4500);
		}
	  
	}

scroll();


var i = 0, howManyTimes = 10;
function f() {
    alert( "hi" );
    i++;
    if( i < howManyTimes ){
        setTimeout( f, 3000 );
    }
}
f();