#!/usr/bin/env python3

# RSMgetMarketOrdersByAggregate.py
# Takes depthsdata and returns MarketOrdersByInterval
# MarketOrdersByAggegate
# ["LowOfInterval", "AskVolumeinShares", ""BuyVolumeinShares", "AskVolumeinmBTC", "BuyVolumeinmBTC"]

def RSMgetMarketOrdersByAggegate(depthsdata, tickerdata):
  
  # Hardcoded Interval of 0.5 mBTC
  INTERVAL = 0.05
  # Market Orders By Aggregate
  LastPrice = float(tickerdata['ticker']['last']) / 0.001;
  
  print("Depths Data:")
  print(depthsdata)
  
  print ("Price  "+  str(LastPrice))
  minimum = LastPrice - INTERVAL * 10 
  print(minimum)
  
  
  
  return
