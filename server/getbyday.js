// New and improved getbyday.js

/* Get Trades and Convert to Day By Day */

function getbyday(sevendaytrades, currentticker){
  console.log("Get By Day");
  var ONE_DAY = 60 * 60 * 1000 * 24;
  // Today
  var TODAY = new Date();
  // Initialize trades by days
	tradesbyday = [['DaysAgo', 'Low', 'First', 'Last', 'High', 'Mean', 'Buy Volume' , 'Sell Volume']]
	// Initialize Array
	for (var x = 0; x < 7; x++){
                console.log("Running through Days on day " + String(x) );
		// Push Default
                thislow = 0.0;
                thisfirst = 0.0;
                thislast = 0.0;
                thishigh = 0.0;
                thismean = 0.0;
                thisvol = 0.0;
                thisvolbuy = 0.0;
                thisvolsell = 0.0;
                thisvolbtc = 0.0;
                thisrunwmean = 0.0;
                thisfirsttrans = true;
                thisprices = []
		// Cycle through all trades
		for (var i = 0; i < sevendaytrades.length; i++){
			// See the date of sevenday trade I'm watching cycling through
			var dateofobj = new Date(parseFloat(sevendaytrades[i]["date"]) * 1000);
                        CyclePrice = parseFloat(sevendaytrades[i]["price"]) / 0.001;
                        CycleAmount = parseFloat(sevendaytrades[i]["amount"]);
                        CycleType = String(sevendaytrades[i]["type"]);
                        console.log(CycleType);
			// if Date is in the current trades by day
			if ( dateofobj >= (TODAY - (ONE_DAY * (x+1))) && (dateofobj <= (TODAY - (ONE_DAY * x)))){
                                if (thisfirsttrans){
                                        // Set First and Low
                                        thisfirst = CyclePrice;
                                        thislow = CyclePrice;
                                        thisfirsttrans = false;
                                }
                                if (CyclePrice > thishigh){
                                        // Set High
                                        thishigh = CyclePrice;
                                }
                                if (CyclePrice < thislow){
                                        // Set Low
                                        thislow = CyclePrice;
                                }
                                // This is the last one (Unless a newer transaction is found
                                thislast = CyclePrice
                                // Add Vol in Shares and BTC
 				thisvol += CycleAmount
                                thisvolbtc += CycleAmount * CyclePrice
                                if (CycleType == "buy") {
                                        // if it was a "buy"
                                        thisvolbuy += CycleAmount * CyclePrice;
                                } else {
                                        // it was a "sell"
                                        thisvolsell += CycleAmount * CyclePrice;
                                }
 				// Add Running mean
 				thisrunwmean += CycleAmount * CyclePrice
 				// Add Prices for Parsing Later
 				thisprices.push([CyclePrice, CycleAmount]);
			} // Finish checking this transaction for in date range
		} // Finish checking all transactions in sevendaytrades
		if(thisprices.length == 0){
			// There are no Transaction and no Transaction data
			console.log("No Transactions for " + x  + " days back");
		} else {
		// There Are Transactions
		// Calculate Mean
			thismean = thisrunwmean / thisvol;
		}
                console.log("Transactions for this day");
                console.log(thisprices);
                console.log([ x , thislow, thisfirst, thislast, thishigh , thismean, thisvolbtc]);
		tradesbyday[x+1] = [ x , thislow, thisfirst, thislast, thishigh , thismean, thisvolbuy, thisvolsell];
	} // Finish Populating by days
        console.log("Transactions By Day Populated:");
	console.log(tradesbyday);
	// Translate Days Ago to Strings
	for (var k = 1; k < tradesbyday.length; k++){
                console.log(tradesbyday[k]);
		thisdaydate = new Date(TODAY - (ONE_DAY * tradesbyday[k][0]));
		D = thisdaydate.getDate();
		M = thisdaydate.getMonth() + 1;
		Y = thisdaydate.getFullYear();
		thisdaystring = M + "/" + D;
		//console.log(thisdaystring);
		tradesbyday[k][0] = thisdaystring;
	}
	return tradesbyday;
}
