RSMWebTicker
============

Javascript Webticker for RSM Stock on 796.com

Currently on V1. Demo of v1 in server/index.html. Content of v1 in server/v1.
Keep in mind v1 is currently hardcoded for api.redstarmining.com. You can change this by forking and changing the hardcoding and hosting on individual site.

To include a copy of this ticker on your site include this html:
  ```html
  <div id="tickbox">
  <link rel="stylesheet" type="text/css" href="http://api.redstarmining.com/v1/rsmwebticker.css">
  <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.js" ></script>
  <script type="text/javascript" src="http://api.redstarmining.com/v1/ticker.js"></script>
  <script type="text/javascript" src="http://api.redstarmining.com/v1/trades.js"></script>
  <script type="text/javascript" src="http://api.redstarmining.com/v1/depth.js"></script>
  <script type="text/javascript" src="http://api.redstarmining.com/v1/getbyday.js"></script>
  <script type="text/javascript" src="http://api.redstarmining.com/v1/rsmwebticker.js"></script>
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <script type="text/javascript" >
  // Main Program
  main();
  </script>
  <div id="chart_div"></div>
  <div id="chart2_div"></div>
  </div>
  ```
  
Keep an eye on the v2 directory for future changes.

CRH
