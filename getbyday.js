/* Get Trades and Convert to Day By Day */

function getbyday(sevendaytrades, currentticker){
	console.log(sevendaytrades);
	// 60 mins * 60 secs * 1000 ms * 24 hours
  var ONE_DAY = 60 * 60 * 1000 * 24;
  // Today
  var TODAY = new Date();
  // Initialize trades by days
	tradesbyday = [['DaysAgo', 'Varience', 'NegVar', 'PosVar', 'High', 'Mean', 'Volume']]
	// Initialize Array
	for (var x = 0; x < 7; x++){
		// Push Default
		var thislow = 0;
		var thisneg = 0;
		var thispos = 0;
		var thishigh = 0;
		var thismean = 0;
		var thisvol = 0;
		var first = true;
		var thisrunwmean = 0;
		var thisprices = [];
		// Cycle through all trades
		console.log(sevendaytrades);
		for (var i = 0; i < sevendaytrades.length; i++){
			// See the date of sevenday trade I'm watching
			var dateofobj = new Date(parseFloat(sevendaytrades[i]["date"]) * 1000);
			// if Date is in the current trades by day
			if ( dateofobj >= (TODAY - (ONE_DAY * (x+1))) && (dateofobj <= (TODAY - (ONE_DAY * x)))){
				// Check Highs & Lows
				if (first == true){
					// First Transaction
					console.log("First Run");
					thislow = parseFloat(sevendaytrades[i]["price"]);
					thishigh = parseFloat(sevendaytrades[i]["price"]);
					first = false;
				} else {
					// Not First Transaction
					if (parseFloat(sevendaytrades[i]["price"]) < thislow){
						// New price is lowest
						thislow = parseFloat(sevendaytrades[i]["price"]);
					} else if (parseFloat(sevendaytrades[i]["price"]) > thishigh) {
						// New Price is highest
						thishigh = parseFloat(parseFloat(sevendaytrades[i]["price"]));
					}
				} // End of Checking Highs and Lows
 				// Add Volume
 				thisvol += parseFloat(sevendaytrades[i]["amount"])
 				console.log("This Vol");
 				console.log(thisvol);
 				// Add Running mean
 				thisrunwmean += parseFloat(sevendaytrades[i]["amount"]) * parseFloat(sevendaytrades[i]["price"]);
 				// Add Prices for Parsing Later
 				thisprices.push([parseFloat(sevendaytrades[i]["price"]), parseFloat(sevendaytrades[i]["amount"])]);
			} // Finish checking this transaction for in date range
		} // Finish checking all transactions in sevendaytrades
		if(thisprices.length == 0){
			// There are no Transaction and no Transaction data
			console.log("No Transactions for " + x  + " days back");
		} else {
		// There Are Transactions
		// Calculate Mean
			thismean = thisrunwmean / thisvol;
			console.log("The mean: "); 
			console.log(thismean);
			positiverun = 0;
			postivevorun = 0
			negativerun = 0;
			negativevorun = 0;
			// Calculate PosVar & NegVar
			for (var j = 0; j < thisprices.length; j++){
				console.log(thisprices);
				if ( thisprices[j][0] < thismean ){
					// Negative Run
					negativerun += (thismean - thisprices[j][0])* thisprices[j][1];
					negativevorun += thisprices[j][1];
				} else if ( thisprices[j][0] < thismean) {
					// Positive Run
					positiverun += (thisprices[j][0] - thismean) * thisprices[j][1];
					postivevorun += thisprices[j][1];
				}
			} // Finish run through
			if ( postivevorun == 0){
				// Nothing Above set average above to mean
				thispos=thismean;
			} else {
				thispos = (positiverun / positivevorun) + thismean;
			}
			if ( negativevorun == 0){
				// Nothing below set average to mean
				thisneg = thismean;
			} else {
				thisneg = thismean - (negativerun / negativevorun);
			}
		}
		tradesbyday[x+1] = [ x , thislow, thisneg, thispos, thishigh , thismean, thisvol];
	} // Finish Populating by days
	console.log(tradesbyday);
	// Translate Days Ago to Strings
	for (var k = 1; k < tradesbyday.length; k++){
		thisdaydate = new Date(TODAY - (ONE_DAY * tradesbyday[k][0]));
		D = thisdaydate.getDate();
		M = thisdaydate.getMonth() + 1;
		Y = thisdaydate.getFullYear();
		thisdaystring = M + "/" + D;
		console.log(thisdaystring);
		tradesbyday[k][0] = thisdaystring;
	}
	return tradesbyday;
}
