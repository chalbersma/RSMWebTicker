#!/usr/bin/env python3

# RSMgetAvgPriceByDay.py
# Takes tradesdata & tickerxjson [for initial pricing info] and returns 
# PriceByDay
# ["Day", "AvgPrice" ]

from datetime import time
from datetime import date
from datetime import datetime
from datetime import timedelta

def RSMgetAvgPriceByDay(tradesdata, tickerdata):
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
  #print("Today" , TODAY)
  #print("OldestDate", OLDESTDATE)
  # Date Iterator
  x = OLDESTDATE
  wdavg=0
  while x <= TODAY :
    # Add a Day to the Date Iterator
    x += ONEDAY
    # First Transaction
    transactions = 0
    volumeprice = 0.0
    volume = 0


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
        volumeprice += float(tradeAmount) * float(tradePrice)
        volume += float(tradeAmount)
        
      if (volume == 0):
        # No Transactions for this day
        if (len(datatoreturn) == 0) : 
          ## First Day
          wdave = 0.0
        else :
          ## Set average to yesterday's average
          wdavg = datatoreturn[-1][1]
      else :      
        ## Have data Calculate Day's Average W. Price
        wdavg = float(volumeprice)/float(volume)

    thisday = [ x.strftime(fmt), round(float(wdavg), 6)]
    datatoreturn.append(thisday)
  return datatoreturn
