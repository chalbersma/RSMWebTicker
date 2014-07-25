/* Chart.js  Main js File for v2 of RSMWebTicker */

// Include Needed Files

// Change This to Server that hosts js stuff
HOSTSTRING="http://localhost:8080/"

function populate(){
  // Google Scirpts
  $.getScript('http://www.google.com/jsapi', function(){
    console.log("Sucessfully Loaded Google Vizualization");
  });

  // Write Ticker
  $.getScript('v2/js/Ticker.js', function(){
    console.log("Successfully Loaded Ticker.js");
  });

  // Actual Write Ticker
  writeTicker();

}
