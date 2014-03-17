#!/usr/bin/env python3

# RSMgetPriceByDay.py
# Takes tradesdata & tickerxjson [for initial pricing info] and returns 
# PriceByDay
# ["Day", "Lowest", "First", "Last", "High" ]

from datetime import time
from datetime import date
from datetime import datetime
from datetime import timedelta


def RSMgetPriceByDay(tradesdata, tickerdata):
  datatoreturn = []
  # Prefered Format yy-mm-dd
  fmt = "%y-%m-%d"
  ## Cycle through Days
  # Find Oldest Day
  OLDESTDATE = date.fromtimestamp(int(tradesdata[len(tradesdata)-1]['date']))
  # Find TODAY
  TODAY = date.today()
  # Make a TimeDelta of One Day
  ONEDAY = timedelta(days=1)
  print("Today" , TODAY)
  print("OldestDate", OLDESTDATE)
  # Date Iterator
  x = OLDESTDATE
  while x <= TODAY :
    # Add a Day to the Date Iterator
    x += ONEDAY
    # First Transaction
    firstTransaction = True;
    dayLowest = 0.0
    dayHighest = 0.0
    dayFirstPrice = 0.0
    dayLastPrice = 0.0


    for i in tradesdata : 
      # Pull Data From This trade
      tradeType = i['type']
      tradeAmount = i['amount']
      tradeTxID = i['tid']
      # Pull Datetime from Timestamp
      tradeTxDateTime = datetime.fromtimestamp(int(i['date']))
      # Pull Date
      tradeTxDay =  tradeTxDateTime.date()
      # Pull time
      tradeTxTime = tradeTxDateTime.time()
      # All Calulated Prices as mBTC
      tradePrice = float(float(i['price']) / 0.001)
      
      ## See if this trade is in the required date
      if (x == tradeTxDay):
        ## Trade is in Date
        if (firstTransaction == True):
          ## First transaction of the Day
          dayFirstPrice = tradePrice
          dayHighest = tradePrice
          dayLowest = tradePrice
          firstTransaction = False
        ## Trade is not first transaction
        dayLastPrice = tradePrice
        ## Check Highest and Lowest & Set if appropriate
        if ( float(tradePrice) > float(dayHighest) ):
          dayHighest = tradePrice
        if ( tradePrice < float(dayLowest) ):
          dayLowest = tradePrice
          
    thisday = [ x.strftime(fmt), round(float(dayLowest),6), round(float(dayFirstPrice),6), round(float(dayLastPrice),6), round(float(dayHighest),6) ]
    datatoreturn.append(thisday)
  print(datatoreturn)
  return
