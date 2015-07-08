/* Chart.js  Main js File for v2 of RSMWebTicker */

// Include Needed Files

/// Google Scirpts
$.getScript('http://www.google.com/jsapi', function(){
  console.log("Sucessfully Loaded Google Vizualization");
});

/// Geting Data
$.getScript("http://api.redstarmining.com/v1/ticker.js",function(){
  console.log("Successfully Loaded Ticker Data");
});

/// Getting Trades
$.getScript("http://api.redstarmining.com/v1/trades.js", function(){
  console.log("Successfully Loaded Trades Data");
});

/// Getting Depth
$.getScript("http://api.redstarmining.com/v1/depth.js", function(){
  console.log("Successfully Loaded Depth Data");
});

/// Get Gallery Control
// Enable after development is complete
/*$.getScript("v3/gallery.js",function(){
  console.log("Successfully Loaded Gallery Control");
});
* */
