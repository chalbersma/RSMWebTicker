function converttodate(rsmtrades, DAYS){
  // 60 mins * 60 secs * 1000 ms * 24 hours
  var ONE_DAY = 60 * 60 * 1000 * 24;
  // Today
  var TODAY = new Date();
  // object to return
  var last24hourtrades = new Array();
  // Cycle through transactions
  for ( i = 0; i < rsmtrades.length; i++){
    // find date of current object
    var dateofobj = new Date(parseFloat(rsmtrades[i]["date"]) * 1000);
    if ( dateofobj >= (TODAY - (ONE_DAY * DAYS))){
      // Current object/transaction is less than 24 hours old
      last24hourtrades.push(rsmtrades[i]);
    } else {
      // Current object/transaction is older than 24 hours old do nothing
      continue;
    }
  }
  return last24hourtrades;
}

function getweightedavg(recenttrades, defaultvalue){
  // Set Variables
  var weightedaverage = 0.0
  var totalunits = 0.0;
  var bignumber = 0.0
  
  if (recenttrades.length == 0 ){
  // Nothing to do. Set value to Default
  weightedaverage = defaultvalue;
  } else {
    // Cycle through trades in last 24 hours
    for ( i = 0; i < recenttrades.length; i++){
      // Add volume to total units
      totalunits += parseFloat(recenttrades[i]["amount"]);
      // Add value of trade to bignum
      bignumber += parseFloat(recenttrades[i]["amount"]) * parseFloat(recenttrades[i]["price"])
      // Divide for Weighted Average
      weightedaverage = (bignumber / totalunits);
    }
  }
  return weightedaverage;
}

function main(){
  // RSM Web Ticker

  // Running Ticker from JS pulled from api.redstarmining.com
  var rsmticker = ticker();
  
  // Running Trades from JS pulled from api.redstarmining.com
  var rsmtrades = trades();

  // Change my string into a JSON object
  var rsmtickerjson = $.parseJSON(rsmticker);
  var rsmtrades = $.parseJSON(rsmtrades);
  
  // Grab the trades in the last 24 Hours
  lasttrades = converttodate(rsmtrades, 1);
  
  // Weighted Average by Volume
  rsmtickerjson["average"] = getweightedavg(lasttrades, rsmtickerjson["last"]);

  
  // Initialize Derived JSON Bits
  rsmtickerjson["diff"] = 0.0;
  rsmtickerjson["above"] = true;
  rsmtickerjson["diffchar"] = " " ;
  
  /* Decide if last price (current price
      is greater or less than average. Equal is above 
      */
  if ( parseFloat(rsmtickerjson["last"]) >= parseFloat(rsmtickerjson["average"]) ){
      // Last price is more or equal than 24 HR Low
      // So I'm getting the difference Default above boolean is already true
      rsmtickerjson["diff"] = parseFloat(rsmtickerjson["last"]) - parseFloat(rsmtickerjson["average"]);
  } else { 
      // Last price is less than 24 HR Low
      // SO I'm getting the difference and setting my "above" boolean to be false;
      rsmtickerjson["above"] = false;
      rsmtickerjson["diff"] = parseFloat(rsmtickerjson["average"]) - parseFloat(rsmtickerjson["last"]);
  }
  

  // Based on above / Below Boolean I'm setting the correct string for the icon and for the change character.
  if (rsmtickerjson["above"] == true){
      rsmtickerjson["difficon"]  = "up.png";
      rsmtickerjson["diffchar"] = "+";
  } else {
      rsmtickerjson["diffchar"] = "-";
      rsmtickerjson["difficon"] = "down.png";
  }
  
  /* Write Out Unorderd List with all the Bits and Pieces */
  document.writeln("<ul id='tickerlist'>");
  // Bitcoin Price with 
  //                                                      Icon Source for Diff Bits
  //                                                                                      Last Price
  //                                                                                                                  Difference with Designated Char
  document.writeln("<li id='price'> Price: <img src='" + rsmtickerjson["difficon"] + "' /> " + rsmtickerjson["last"] + " XBT \(" + rsmtickerjson["diffchar"] + rsmtickerjson["diff"].toFixed(8) + "\)</li>");
  // Bitcoin Unwieghted average
  document.writeln("<li id='average'> 24 HR W. Avg: " + rsmtickerjson["average"] + " XBT</li>");
  // 24 High in Bitcoin
  document.writeln("<li id='high'> 24 HR High: " + rsmtickerjson["high"] + " XBT</li>");
  // 24 Hour Low in Bitcoin
  document.writeln("<li id='low'> 24 HR Low: " + rsmtickerjson["low"] + " XBT</li>");
  // 24 Hour Volume in Shares
  document.writeln("<li id='vol'> 24 HR Vol: " + rsmtickerjson["vol"] + " Shares </li>");
  // End Unordered List
  document.writeln("</ul>");

};


function drawChart() {
	

	var rsmtrades = trades();
	var rsmtrades = $.parseJSON(rsmtrades);
	sevendaytrades = converttodate(rsmtrades, 9);
	dataarray = [["Date","Price"]]; // In form of [ 'DATE' , 'Last Price' ]
	console.log(sevendaytrades);
	
	for(var i=0; i < sevendaytrades.length; i++){
		var dateofobj = new Date(parseFloat(sevendaytrades[i]["date"]) * 1000);
		var priceofobj = parseFloat(sevendaytrades[i]["price"]);
		dataarray[i+1] = [dateofobj, priceofobj];
	}
	
	console.log("Data Array: " + dataarray);
	
	var data = google.visualization.arrayToDataTable(dataarray);

	var options = {
	  'title': 'Recent RSM Price',
	  'width': 400
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

