/* Ticker.js */

function writeCurrentTicker(lastCurrent){
	console.log(lastCurrent);
	// Convert from String to JSON
	lastCurrentActual = jQuery.parseJSON(lastCurrent);
	// Hardcoded
	TICKERDESCRIPTION = [ "Price", "TODAY Weighted Price" ,  "TODAY HR High", "TODAY HR Low", "TODAY HR VOL (SHARES)", "TODAY HR VOL (mBTC)" ];
	var HTMLBITS = new Array();

	for (var i =0 ; i < lastCurrentActual.length; i++){
		HTMLBITS[String(TICKERDESCRIPTION[i])] = "<tr><td> " + String(TICKERDESCRIPTION[i]) + " </td><td> " + String(lastCurrentActual[i]) + " </td></tr> " ;
	}
	
	console.log(String(HTMLBITS));
	console.log("Writing to div tickbox")
	htmlToPlace = "<table>";
	for (var j =0 ; j < TICKERDESCRIPTION.length ; j++){
		console.log(j);
		htmlToPlace += HTMLBITS[String(TICKERDESCRIPTION[j])];
		console.log(htmlToPlace)
	}
	htmlToPlace += "</table>";
	document.getElementById('tickbox').innerHTML = htmlToPlace;

	return
}

