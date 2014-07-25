/* Chart.js  Main js File for v2 of RSMWebTicker */

// Include Needed Files

// Change This to Server that hosts js stuff
HOSTSTRING="http://localhost:8080/RSMWebTicker/server/"

function populate(){
  // Google Scirpts
  $.getScript('http://www.google.com/jsapi', function(){
    console.log("Sucessfully Loaded Google Vizualization");
  });

  // Write Ticker
  $.getScript(HOSTSTRING+'v2/js/Ticker.js', function(){
    alert( "success" );
  })
    .done(function() {
      console.log("Successfully Loaded Ticker.js");
    })
    .fail(function() {
      alert( "error")
			if (arguments[0].readyState==0){
				alert ( "Failure to Load")
			} else { 
				alert (arguments[2].toString());
			}	
    })
    .always(function() {
      alert( "finished" )
    });
}
