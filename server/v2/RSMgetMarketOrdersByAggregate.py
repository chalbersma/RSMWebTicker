#!/usr/bin/env python3

# RSMgetMarketOrdersByAggregate.py
# Takes depthsdata and returns MarketOrdersByInterval
# MarketOrdersByAggegate
# ["Extreme", "AskVolumeinShares", ""BuyVolumeinShares", "AskVolumeinmBTC", "BuyVolumeinmBTC"]

import math

def RSMgetMarketOrdersByAggegate(depthsdata, tickerdata):
  
  ToReturn = []
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
    RaskVolShares = 0
    RbidVolShares = 0
    SRaskVol = 0
    SRbidVol = 0
    if (i < 0):
      # Set SFLastPrice to 1 Satoshi less than SLastPrice
      SFLastPrice = SLastPrice - 1
      SthisPriceInterval = (SLastPrice + (SINTERVAL * i) )
      Scheckrange = range(SthisPriceInterval,SFLastPrice)
      SExtreme = SthisPriceInterval
    elif (i > 0 ):
      # Price is Higher Than Price
      SFLastPrice = SLastPrice + 1
      SthisPriceInterval = (SLastPrice + (SINTERVAL * i) )
      Scheckrange = range(SFLastPrice,SthisPriceInterval)
      SExtreme = SthisPriceInterval
    else :
      # Is Price
      # Fixes the fact that ranges are not inclusive on the top end
      SFLastPrice = SLastPrice - 1
      SthisPriceInterval = SLastPrice+1
      Scheckrange = range(SFLastPrice,SthisPriceInterval)
      SExtreme = SLastPrice
    
    # Print Range
    #print ("Range " + str(i) + " : " + str(SFLastPrice) + " to " + str(SthisPriceInterval))
    for a in depthsdata['asks']:
      # Find Matching Asks & Tally
      # Find Price in Satoshis
      SaPrice = int(float(a[0])/0.0000001)
      SaShares = int(a[1])
      if SaPrice in Scheckrange:
        #print("Ask: " + str(SaShares) + " @ " + str(SaPrice) )
        # Add to Ask Volume in Shares and Satoshis
        RaskVolShares = RaskVolShares + SaShares
        SRaskVol = SRaskVol + SaPrice * SaShares
    for b in depthsdata['bids']:
      # Find Matchin Bids & Tally
      # Find Price in Satoshis
      SbPrice = int(float(b[0])/0.0000001)
      SbShares = int(b[1])
      if SbPrice in Scheckrange:
        #print("Bid: " + str(SbShares) + " @ " + str(SbPrice) )
        RbidVolShares = RbidVolShares + SbShares * SbPrice
        SRbidVol = SRbidVol + SbPrice
    # This Intervals Stats in Satoshis
    #print([SExtreme, RaskVolShares, RbidVolShares, SRaskVol, SRbidVol])
    # Convert Sats to mBTC
    RaskVol = round(SRaskVol * 0.00001, 5)
    RbidVol = round(SRbidVol * 0.00001, 5)
    Extreme = round(SExtreme * 0.00001, 5)
    #print([Extreme, RaskVolShares, RbidVolShares, RaskVol, RbidVol])
    
    # Add Data to return bit
    ToReturn.append([Extreme, RaskVolShares, RbidVolShares, RaskVol, RbidVol])

  
  
  
  return ToReturn
