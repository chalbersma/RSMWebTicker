var dailybreakdown = [];
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
	  console.log(dateofobj);
    } else {
      // Current object/transaction is older than 24 hours old do nothing
      continue;
    }
  }
  return last24hourtrades;
};


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
      rsmtickerjson["difficon"]  = "http://api.redstarmining.com/up.png";
      rsmtickerjson["diffchar"] = "+";
  } else {
      rsmtickerjson["diffchar"] = "-";
      rsmtickerjson["difficon"] = "http://api.redstarmining.com/down.png";
  }
  
  /* Write Out Unorderd List with all the Bits and Pieces */
  document.writeln("<img src='http://api.redstarmining.com/rsm-thumbd.png' />");
  document.writeln("<ul id='tickerlist'>");
  // Bitcoin Price with 
  //                                                      Icon Source for Diff Bits
  //                                                                                      Last Price
  //                                                                                                                  Difference with Designated Char
  document.writeln("<li id='price'><img src='" + rsmtickerjson["difficon"] + "' /> " + rsmtickerjson["last"] + " \u0E3F \(" + rsmtickerjson["diffchar"] + rsmtickerjson["diff"].toFixed(8) + "\)</li>");
  // Bitcoin Unwieghted average
  document.writeln("<li id='average'> 24 HR W. Avg: " + rsmtickerjson["average"].toFixed(4) + " \u0E3F</li>");
  // 24 High in Bitcoin
  document.writeln("<li id='high'> 24 HR High: " + rsmtickerjson["high"] + " \u0E3F</li>");
  // 24 Hour Low in Bitcoin
  document.writeln("<li id='low'> 24 HR Low: " + rsmtickerjson["low"] + " \u0E3F</li>");
  // 24 Hour Volume in Shares
  document.writeln("<li id='vol'> 24 HR Vol: " + rsmtickerjson["vol"] + " Shares </li>");
  // End Unordered List
  document.writeln("</ul>");
  
  dailybreakdown = getbyday(converttodate(rsmtrades, 7), rsmtickerjson);
  console.log(dailybreakdown);
  
  // Do Chart Stuff
  // Load Google Charts API
  google.load("visualization", "1", {packages:["corechart"]});	
  // Draw Chart after page Loads
  google.setOnLoadCallback(drawChart);
  
};


function drawChart() {
	
	
	/*
	var rsmtrades = trades();
	var rsmtrades = $.parseJSON(rsmtrades);
	
	sevendaytrades = converttodate(rsmtrades, 7);
	dataarray = [["Date","Price","Volume"]]; // In form of [ 'DATE' , 'Last Price', 'Volume' ]
		
	for(var i=0; i < sevendaytrades.length; i++){
		var dateofobj = new Date(parseFloat(sevendaytrades[i]["date"]) * 1000);
		var priceofobj = parseFloat(sevendaytrades[i]["price"]);
		var volumeofobj = parseFloat(sevendaytrades[i]["amount"]);
		dataarray[i+1] = [dateofobj, priceofobj, volumeofobj];
	}
	
	*/
	
	console.log(dailybreakdown);
	
	

	var data = google.visualization.arrayToDataTable(dailybreakdown);

	var options = {
	  title: 'Recent RSM Price',
	  series: { 1: {type: "line"},
				2: {type: "bars", targetAxisIndex: 1}
				}, 
	  vAxes: { 
				0: { 
					title: "Price"
				},
				1: {
					title: "Volume"
				}
			},
	  isStacked: true,
	  aggregationTarget: 'category'
	};

	var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
	chart.draw(data, options);
	
	
}

