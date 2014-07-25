/* Ticker.js */

// Writes A Ticker in A Table

// Get Current Ticker

function writeTicker(){
  console.log("In writeTicker");

  TICKERDESCRIPTION = [ "Price", "TODAY Weighted Price" , "TODAY HR Hight", "TODAY HR Low", "TODAY HR VOL (SHARES)", "TODAY HR VOL (mBTC)" ];

//  $.getScript('v2/js/CurrentTicker.js', function(){
//    console.log("Sucessfully Loaded Current Ticker");
//   });

  lastCurrentTicker = CurrentTicker();
  
  /*
  * [ "Price", "TODAY Weighted Price" "TODAY HR Hight", "TODAY HR Low", TODAY HR VOL (SHARES), "TODAY HR VOL (mBTC)" ]
  * 
  */
  
  // Generate HTML
  HTML = new Array();
  
  for (var i = 0; i < TICKERDESCRIPTION.length(); i++ ){
    HTML[TICKERDESCRIPTION[i]] = lastCurrentTicker[i];
  }
  document.writeln(HTML);
  console.log(HTML);
  

}

