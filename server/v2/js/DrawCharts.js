/* DrawChart.js - Draw Charts */

// Charts Info

// Need Name Data & Options for Each

chartInfo = [ 
							// Avg Price By Day
							{
								name: "Average Price By Day" , 
								predata: function(){
										AvgPriceByDay = null;
									},
								data: LoadJSFile(HOSTSTRING, "v2/js/AvgPriceByDay.js", "AvgPriceByDay", function(){
										var pricebydaydata = AvgPriceByDay();
										console.log("Price By Day Data:  "+pricebydaydata);
										return pricebydaydata;
									}
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
								},
								// Price By Day and Volume
								{
									name: "Price and Volume By Day",
									predata: function(){
											AvgPriceByDay = null;
											PriceByDay = null;
										},
									data: LoadJSFile(HOSTSTRING, "v2/js/AvgPriceByDay.js", "AvgPriceByDay.js", function(){
										var pricebydaydata = AvgPriceByDay();
										LoadJSFile(HOSTSTRING, "v2/js/PriceByDay.js", "PriceByDay.js", function(){
											var pricedatabyday = PriceByDay();
											// Price Data create Second Graph
							]
