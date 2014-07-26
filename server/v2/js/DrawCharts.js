/* DrawChart.js - Draw Charts */

// Charts Info

// Need Name Data & Options for Each

chartInfo = [ 
							// Avg Price By Day
							{
								name: "Average Price By Day" , 
								data: None, 
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
								}
							]
