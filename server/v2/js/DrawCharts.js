/* DrawChart.js - Draw Charts */

// Charts Info

// Need Name Data & Options for Each

chartInfo = [{ 
							name: "Average Price By Day" , 
							predata: function(){
									AvgPriceByDay = null;
								},
							data: function(){LoadJSFile(HOSTSTRING, "v2/js/AvgPriceByDay.js", "AvgPriceByDay", function(){
									var pricebydaydata = jQuery.parseJSON(AvgPriceByDay());
									// Draw Google Charts
									// Add Title
									pricebydaydata.unshift(["Day", "Price"]);
									var googledata = google.visualization.arrayToDataTable(pricebydaydata);
									var chart = new google.visualization.ComboChart(document.getElementById('graph'));
									chart.draw(googledata, self["options"]);
									return pricebydaydata;
								});},
							options: 
								{ 
									title: "Average Price By Day",
									series: 
										{
											0: 
												{
													type: "line",
													targetAxisIndex: 0
												}
										},
									vAxes:
										{
											0:
												{
													title: "Price mBTC"
												}
										},	
									height: 300
								}
							},{
								name: "Price and Volume By Day",
								predata: function(){
										AvgPriceByDay = null;
										PriceByDay = null;
									},
								data: function(){LoadJSFile(HOSTSTRING, "v2/js/AvgPriceByDay.js", "AvgPriceByDay.js", function(){
									var avgpricebydaydata = jQuery.parseJSON(AvgPriceByDay());
									return LoadJSFile(HOSTSTRING, "v2/js/PriceByDay.js", "PriceByDay.js", function(){
										var pricedatabyday = jQuery.parseJSON(PriceByDay());
										for (var i = 0 ; i < avgpricebydaydata.length ; i++){
											pricedatabyday[i][5] = avgpricebydaydata[i][1];
										}
										// Draw Chart
										pricedatabyday.unshift(["Day", "Lowest", "First", "Last", "High", "Average"]);
										console.log("This must be an Array to Work: "+pricedatabyday);	
										var googledata = google.visualization.arrayToDataTable(pricedatabyday);
										var chart = new google.visualization.ComboChart(document.getElementById('graph'));
										chart.draw(googledata, self["options"]);
										
										// Provide Return Data
										return pricedatabyday;
									});
								});},
								options: {
										title: "Price and Volume By Day",
										isStacked: true,
											aggregationTarget: 'category',
										height : 300
									}
								},{
								name: "Active Bids by Interval",
								predata: function(){
										MarketOrdersByInterval = null;
									},
								data: function(){
										LoadJSFile(HOSTSTRING, "v2/js/MarketOrdersByInterval.js", "MarketOrdersByInterval.js", function(){
											console.log("Parsing The Data");
											var thedata = jQuery.parseJSON(MarketOrdersByInterval());
											console.log("Shifting the Data");
											thedata.unshift(["Low of Interval", "Ask (Shares)", "Buy (Shares)", "Ask (mBTC)", "Buy (mBTC)"]);
											console.log("Google the data");
											var googledata = google.visualization.arrayToDataTable(thedata);
											var chart = new google.visualization.ComboChart(document.getElementById('graph'));
											chart.draw(googledata, self["options"]);
										});
									},
								options: {
										title: "Active Bids",
										series: {
											1: {
												type: "bars",
												targetAxisIndex: 0
											},
											2: {
												type: "bars",
												targetAxisIndex: 1
											},
											3: {
												type: "bars",
												targetAxisIndex: 2
											},
											4: {
												type: "bars",
												targetAxisIndex: 3
											}
										},
										vAxes: {
											0: {
												title: "Buy Orders (Shares)"
											},
											1: {
												title: "Buy Orders (mBTC)"
											},
											2: {
												title: "Sell Orders (Shares)"
											},
											3: {
												title: "Sell Orders (mBTC)"
											}
										},
										hAxis: {
											0: {
												title: "Low of Interval"
											}
										},
										height : 300,
										seriesType: "bars"
									}
								}
							];
