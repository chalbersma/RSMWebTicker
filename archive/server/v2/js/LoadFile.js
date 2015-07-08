/* Loads and Parses Javascript File */


function LoadJSFile(HOSTSTRING, filename, commonName, callme){
	var thingtoreturn
	$.getScript(HOSTSTRING+filename, function(){
	})
	.done(function() {
		console.log("Successfully Loaded"+commonName);
		thingtoreturn = callme();
	})
	.fail(function() {
     console.log("Loading Script "+commonName+" Failed");
     if (arguments[0].readyState==0){
       console.log("Network Issue: Can not reach load "+commonName);
     } else {
       console.log("Unable to Parse " +  commonName +  "Parser error Message");
       console.log((arguments[2].toString()));
     }
   })
   .always(function() {
     console.log("Loaded "+ commonName);
	});
	return thingtoreturn;
}
