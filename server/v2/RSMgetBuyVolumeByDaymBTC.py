#!/usr/bin/env python3

# RSMgetBuyVolumeByDaymBTC.py
# Takes tradesdata and returns BuyVolumeByDaymBTC 
# BuyVolumeByDaymBTC
# ["Day", "BuyValueinmBTC"]


from datetime import time
from datetime import date
from datetime import datetime
from datetime import timedelta

def RSMgetBuyVolumeByDaymBTC(tradesdata, tickerdata):
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
    volumemBTC = 0

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
          if (tradeType == "buy"):
            ## First transaction of the Day
            volumemBTC += float(tradePrice)*float(tradeAmount)
          
    thisday = [ x.strftime(fmt), round(float(volumemBTC), 6) ]
    datatoreturn.append(thisday)
  return datatoreturn
