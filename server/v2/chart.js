/* Chart.js  Main js File for v2 of RSMWebTicker */

// Include Needed Files

HOSTSTRING="http://localhost:8080/"

function populate(){
  // Google Scirpts
  $.getScript('http://www.google.com/jsapi', function(){
    console.log("Sucessfully Loaded Google Vizualization");
  });

  // Write Ticker
  $.getScript('v2/js/Ticker.js', function(){
    console.log("Sucessfully Loaded Google Vizualization");
  });


}
