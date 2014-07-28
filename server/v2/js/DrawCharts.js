/* DrawChart.js - Draw Charts */

// Charts Info

// Need Name Data & Options for Each

chartInfo = [{ 
							name: "Average Price By Day" , 
							predata: function(){
									AvgPriceByDay = null;
								},
							data: function(options){LoadJSFile(HOSTSTRING, "v2/js/AvgPriceByDay.js", "AvgPriceByDay", function(){
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
								data: function(options){LoadJSFile(HOSTSTRING, "v2/js/AvgPriceByDay.js", "AvgPriceByDay.js", function(){
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
								name: "Active Bids by Interval (Shares)",
								predata: function(){
										MarketOrdersByInterval = null;
									},
								data: function(options){
										LoadJSFile(HOSTSTRING, "v2/js/MarketOrdersByInterval.js", "MarketOrdersByInterval.js", function(){
											console.log("Parsing The Data");
											var thedata = jQuery.parseJSON(MarketOrdersByInterval());
											console.log(thedata);
											var thegooddata = new Array();
											for (var i = 0; i < thedata.length; i++){
												thegooddata[i] = [ thedata[i][0], thedata[i][1], thedata[i][2] ];
											}
											console.log("Shifting the Data");
											thegooddata.unshift(["Low of Interval", "Ask (Shares)", "Buy (Shares)"]);
											console.log("Google the data");
											var googledata = google.visualization.arrayToDataTable(thegooddata);
											var chart = new google.visualization.ComboChart(document.getElementById('graph'));
											console.log(options);
											chart.draw(googledata, options);
										});
									},
								options: {
										title: "Active Bids (Shares)",
										height : 300,
										seriesType: "bars",
										vAxes: {
											0: {
												title: "Buy (Shares)",
											},
											1: {
												title: "Ask (Shares)",
											}
										},
										series: {
											0: {
												targetAxisIndex: 1
											},
											1: {
												targetAxisIndex: 0
											}
										}
									}
								}
							];