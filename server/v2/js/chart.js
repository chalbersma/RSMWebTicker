/* Chart.js  Main js File for v2 of RSMWebTicker */

// Include Needed Files

// Change This to Server that hosts js stuff
HOSTSTRING="http://localhost:8080/RSMWebTicker/server/"
function dummy(){
	// Dummy Function
	return
}

function populate(){
  // Google Scirpts
  $.getScript('http://www.google.com/jsapi', function(){
    console.log("Sucessfully Loaded Google Vizualization");
  });

  // Write Ticker
/*  $.getScript(HOSTSTRING+'v2/js/Ticker.js', function(){
  })
    .done(function() {
      console.log("Successfully Loaded Ticker.js");
			writeTicker();
    })
    .fail(function() {
      console.log("Loading Script Ticker.js Failed");
			if (arguments[0].readyState==0){
				console.log("Network Issue: Can't reach&Load Ticker.js");
			} else { 
				console.log("Unable to Parse Ticker.js. Parser error Message");
				console.log((arguments[2].toString()));
			}	
    })
    .always(function() {
      alert( "finished" )
    });
*/

	// Load Function for Writing the Ticker
	LoadJSFile(HOSTSTRING, "v2/js/CurrentTicker.js", "CurrentTicker.js", function(){
		LoadJSFile(HOSTSTRING, "v2/js/Ticker.js", "Ticker.js", function(){ writeCurrentTicker(CurrentTicker()) })
	});

}
