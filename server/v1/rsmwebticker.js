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
	  //console.log(dateofobj);
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
  
  // Vars For Insertion
  // Price
  var strprice = String(parseFloat(rsmtickerjson["last"]) / 0.001);
  var strdiffe = String(rsmtickerjson["diffchar"]) + (parseFloat(rsmtickerjson["diff"]) / 0.001)
  var straverg = String(parseFloat(rsmtickerjson["average"] / 0.001));
  var strhighx = String(parseFloat(rsmtickerjson["high"]) / 0.001)
  var strlowxx = String(parseFloat(rsmtickerjson["low"]) / 0.001)
  var strvolum = String(parseFloat(rsmtickerjson["vol"]))
  
  console.log("Price: " + strprice + "( " + strdiffe + ")");
  
  
  /* Write Out Unorderd List with all the Bits and Pieces */
  document.writeln("<img src='http://api.redstarmining.com/rsm-thumbd.png' />");
  document.writeln("<ul id='tickerlist'>");
  // Bitcoin Price with 
  //                                                      Icon Source for Diff Bits
  //                                                                                      Last Price
  //                                                                                                                  Difference with Designated Char
  document.writeln("<li id='price'>Price: <img src='" + rsmtickerjson["difficon"] + "' /> " + strprice + " m\u0E3F \(" + strdiffe + "\)</li>");
  // Bitcoin Unwieghted average
  document.writeln("<li id='average'> 24 HR W. Avg: " + straverg + " m\u0E3F</li>");
  // 24 High in Bitcoin
  document.writeln("<li id='high'> 24 HR High: " + strhighx + " m\u0E3F</li>");
  // 24 Hour Low in Bitcoin
  document.writeln("<li id='low'> 24 HR Low: " + strlowxx + " m\u0E3F</li>");
  // 24 Hour Volume in Shares
  document.writeln("<li id='vol'> 24 HR Vol: " + strvolum + " Shares </li>");
  // End Unordered List
  document.writeln("</ul>");
  
  dailybreakdown = getbyday(converttodate(rsmtrades, 7), rsmtickerjson);
  //console.log(dailybreakdown);
  
  // Do Chart Stuff
  // Load Google Charts API
  google.load("visualization", "1", {packages:["corechart"]});	
  // Draw Chart after page Loads
  google.setOnLoadCallback(drawChart);
  google.setOnLoadCallback(drawChart2);
  
};

function drawChart2() {
  //console.log("Chart2");
  var rsmticker = ticker();
  var rsmtickerjson = $.parseJSON(rsmticker);
  var lastprice = (rsmtickerjson["last"] / 0.001);
  
  var rsmdepth = depth();
  //console.log(rsmdepth);
  var rsmdepthjson = $.parseJSON(rsmdepth);
  //console.log(rsmdepthjson);
  var biddepth = rsmdepthjson["bids"];
  var askdepth = rsmdepthjson["asks"];
  var biddata = [];
  
  //console.log("Entry");
  var DIFF = (parseFloat(lastprice)/2);
  var STEP = 0.0001 / 0.001
  for(var x = (parseFloat(lastprice) - DIFF); x < (parseFloat(lastprice) + DIFF);  x = x + STEP ){
    //console.log("Inside");
    askatprice = 0;
    askinprice = 0;
    bidatprice = 0;
    bidinprice = 0;
    // Cycle through asks
    for (var a = 0; a < askdepth.length ; a++){
      // If asking price is less than or equal two current value plus price add to askatprice
      if ( (parseFloat(askdepth[a][0]) / 0.001) <= x ){
        askatprice += Number(askdepth[a][1]);
        if ( ( parseFloat(askdepth[a][0])/ 0.001) >= (x - STEP)){
          askinprice += Number(askdepth[a][1]);
        }
      }
    } // Done Cycleing through asks

    
    // Cycle through bids
    for (var b = 0; b < biddepth.length ; b++){
      // If bid is more than or equal to current value minus price add to bidatprice
      if ( (parseFloat(biddepth[b][0]) / 0.001) >= x ){
        bidatprice += Number(biddepth[b][1]);
        if ( (parseFloat(biddepth[b][0]) / 0.001) <= (x + STEP )){
          bidinprice += Number(biddepth[b][1]);
        }
      }
    }// Done cycleing through bids
    //console.log([parseFloat(x.toFixed(6)), bidatprice, askatprice, bidinprice, askinprice]);
    biddata.push([parseFloat(x.toFixed(6)), bidatprice, askatprice, bidinprice, askinprice]);
  }
  
  
  biddata.unshift(["Price", "Agg. Bids", "Agg. Asks", "Bids@" , "Asks@"]);
  //console.log(biddata);

  
  
  
  
  var data = google.visualization.arrayToDataTable(biddata);
  var options = {
    title: 'Active Bids',
    series: { 0: { 
                    type: "line",
                    targetAxisIndex: 0
                  },
              1: { 
                    type: "line",
                    targetAxisIndex: 0
                  },
              2: {
                    type: "bars",
                    targetAxisIndex: 1
                  },
              3: {
                    type: "bars",
                    targetAxisIndex: 1
                  }
            },
    vAxes: { 
              0: { 
                    title: "Aggregate Volume (Shares)"
                  },
              1: {
                    title: "Interval Volume (Shares)"
                  }
            },
    isStacked: true,
	  aggregationTarget: 'category',
    height : 300,
    colors : [ "Green", "Red", "#66A366", "#FF4D4D" ]
  };

	var chart = new google.visualization.AreaChart(document.getElementById('chart2_div'));
	chart.draw(data, options);
}

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
	
	
	console.log("Chart 1");
	console.log(dailybreakdown);

	var data = google.visualization.arrayToDataTable(dailybreakdown);

	var options = {
	  title: 'Recent RSM Price',
	  series: { 
        1: {type: "line"},
				2: {
          type: "bars",
          targetAxisIndex: 1
          },
        3: {
          type: "bars",
          targetAxisIndex: 1
          }
				}, 
	  vAxes: { 
				0: { 
					title: "Price (mBTC)"
				},
				1: {
					title: "Volume (mBTC)"
				}
			},
	  hAxis: {
				0: {
					title: "Date"
				}
			},
    candlestick: {
      fallingColor: {
        fill : "red",
        stroke : "blue"
      },
      risingColor : {
        fill : "green",
        stroke: "blue"
      }
    },
    animation : {
      easing : "in"
    },
	  isStacked: true,
    height: 300,
	  aggregationTarget: 'series',
    colors : [ "Blue", "Black", "#66A366", "#FF4D4D" ]

	};

	var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
	chart.draw(data, options);
	
	
}

