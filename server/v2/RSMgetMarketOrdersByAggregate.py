#!/usr/bin/env python3

# RSMgetMarketOrdersByAggregate.py
# Takes depthsdata and returns MarketOrdersByInterval
# MarketOrdersByAggegate
# ["LowOfInterval", "AskVolumeinShares", ""BuyVolumeinShares", "AskVolumeinmBTC", "BuyVolumeinmBTC"]

import math

def RSMgetMarketOrdersByAggegate(depthsdata, tickerdata):
  
  # Hardcoded Interval of 0.1 mBTC or 10,000 Satoshis
  SINTERVAL = 1000
  # Market Orders By Aggregate in Satoshis
  SLastPrice = int(float(tickerdata['ticker']['last']) / 0.0000001);
  # Multiplier Default Multiplier of 5
  Multiplier = 10
  while (Multiplier > 0 ):
    SproposedLow = SLastPrice - (SINTERVAL * Multiplier)
    if (SproposedLow < 0 ):
      # Multiplier is too large
      Multiplier = Multiplier - 1
    else:
      # Multiplier is good
      break
  
  # End of Loop
  SLow = SproposedLow
  # Begin Loop to find Bits
  for i in range(-Multiplier, Multiplier):
    print ("Range " + str(i) + " : " + str(SLastPrice + (SINTERVAL * i) ) + " to " + str(SLastPrice + (SINTERVAL * (i+1) )))
  
  
  
  return
