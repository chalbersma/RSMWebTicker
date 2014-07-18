#!/usr/bin/env python3

# RSMgetCurrentTicker.py
# Takes tickxjson and returns an array with just the data for the CurrentTicker
# [ "Price", "TODAY Weighted Price" "TODAY HR Hight", "TODAY HR Low", TODAY HR VOL (SHARES)
#   "TODAY HR VOL (mBTC)" ]

# Include Data Manipulation Libraries
from datetime import time
from datetime import date
from datetime import datetime
from datetime import timedelta

def RSMgetCurrentTicker(tickerdata, tradesdata):
  
  datatoreturn = []
  # Last Price in mBTC
  lastPrice = float(tickerdata['ticker']['last'])  / 0.001
  # Find Weighted High Low an Shares
  # Prefered Format yy-mm-dd
  fmt = "%y-%m-%d"
  
  # Find TODAY
  TODAY = date.today()
  # Make a TimeDelta of One Day
  ONEDAY = timedelta(days=1)
  
  # Initialize Counters For Loop
  highPrice=lastPrice
  lowPrice=lastPrice
  volumeShares=0
  volumeMBTCRun=0
  transactions=0
  
  
  # Start cycleing through tradesdata
  for i in tradesdata:
      # Pull Data From This trade
      tradeType = i['type']
      tradeAmount = int(i['amount'])
      tradeTxID = i['tid']
      # Pull Datetime from Timestamp
      tradeTxDateTime = datetime.fromtimestamp(int(i['date']))
      # Pull Date
      tradeTxDay =  tradeTxDateTime.date()
      # Pull time
      tradeTxTime = tradeTxDateTime.time()
      # All Calulated Prices as mBTC
      tradePrice = float(float(i['price']) / 0.001)
      # Only if Transaction is from today
      if ( tradeTxDay == TODAY ) :
        # Calculate Running Weighted Average
        # Increment Transactions
        transactions = transactions + 1
        # Add Transaction Shares
        volumeShares = volumeShares + tradeAmount
        #print (volumeShares)
        # Add Volume Run
        volumeMBTCRun = volumeMBTCRun + (tradeAmount * tradePrice)
        #print ("Volume volume MBTCRUn: + ")
        #print (volumeMBTCRun)
        # Check for New High Price & Low Price
        if ( tradePrice > highPrice ) : 
          highPrice = tradePrice
        if ( tradePrice < lowPrice ) :
          lowPrice = tradePrice
        # End If
        
  # Loop Complete
  # Calculate Volume in MBTC
  if (transactions == 0):
    # No Transactions
    TWeightedPrice=lastPrice
    THigh=lastPrice
    TLow=lastPrice
    TVolumeShares=0
    TVolumeMBTC=0
  else : 
    # Transactions
    TWeightedPrice=volumeMBTCRun/volumeShares
    THigh=highPrice
    TLow=lowPrice
    TVolumeShares=volumeShares
    TVolumeMBTC=volumeMBTCRun
  datatoreturn = [lastPrice, TWeightedPrice, THigh, TLow, TVolumeShares, TVolumeMBTC]
  return datatoreturn
        
          
  return
