function main(){
  // RSM Web Ticker

  // Running Ticker from JS pulled from api.redstarmining.com
  var rsmstring = ticker();
  
  // Normalize with proper JSON EG go from ' to "
  var rsmnormalized = rsmstring.replace(/\'/g,"\"");
  
  // Change my now normalized string into a JSON object
  var rsmjson = $.parseJSON(rsmnormalized);
  
  // Initialize Derived JSON Bits
  rsmjson["diff"] = 0;
  rsmjson["above"] = true;
  rsmjson["diffchar"] = " " ;
  // Derived Json is an unweighted average based on the last 24 hours
  rsmjson["average"] = ((parseFloat(rsmjson["low"]) + parseFloat(rsmjson["high"] )) / 2.0 );
  
  /* Decide if last price (current price
      is greater or less than average. Equal is above 
      */
  if ( parseFloat(rsmjson["last"]) >= parseFloat(rsmjson["average"]) ){
      // Last price is more or equal than 24 HR Low
      // So I'm getting the difference Default above boolean is already true
      rsmjson["diff"] = parseFloat(rsmjson["last"]) - parseFloat(rsmjson["average"]);
  } else { 
      // Last price is less than 24 HR Low
      // SO I'm getting the difference and setting my "above" boolean to be false;
      rsmjson["above"] = false;
      rsmjson["diff"] = parseFloat(rsmjson["average"]) - parseFloat(rsmjson["last"]);
  }
  
  // Based on above / Below Boolean I'm setting the correct string for the icon and for the change character.
  if (rsmjson["above"] == true){
      rsmjson["difficon"]  = "up.png";
      rsmjson["diffchar"] = "+";
  } else {
      rsmjson["diffchar"] = "-";
      rsmjson["difficon"] = "down.png";
  }
  
  /* Write Out Unorderd List with all the Bits and Pieces */
  document.writeln("<ul id='tickerlist'>");
  // Bitcoin Price with 
  //                                                      Icon Source for Diff Bits
  //                                                                                      Last Price
  //                                                                                                                  Difference with Designated Char
  document.writeln("<li id='price'> Price: <img src='" + rsmjson["difficon"] + "' /> " + rsmjson["last"] + " XBT \(" + rsmjson["diffchar"] + rsmjson["diff"].toFixed(8) + "\)</li>");
  // Bitcoin Unwieghted average
  document.writeln("<li id='average'> 24 HR U Avg: " + rsmjson["average"] + " XBT</li>");
  // 24 High in Bitcoin
  document.writeln("<li id='high'> 24 HR High: " + rsmjson["high"] + " XBT</li>");
  // 24 Hour Low in Bitcoin
  document.writeln("<li id='low'> 24 HR Low: " + rsmjson["low"] + " XBT</li>");
  // 24 Hour Volume in Shares
  document.writeln("<li id='vol'> 24 HR Vol: " + rsmjson["vol"] + " Shares </li>");
  // End Unordered List
  document.writeln("</ul>");
}