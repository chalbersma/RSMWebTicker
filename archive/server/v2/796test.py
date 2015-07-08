#!/usr/bin/env python3

# 796 Testing

# Includes Here

import json
import urllib.request
import logging
import sys
from datetime import time
from datetime import date
from datetime import datetime
from datetime import timedelta

print("includes")

# Include SubFunctions
from RSMgetjson import RSMgetjson
print("RSMgetjson")
from RSMgetPriceByDay import RSMgetPriceByDay
from RSMgetAvgPriceByDay import RSMgetAvgPriceByDay
from RSMgetBuyVolumeByDaymBTC import RSMgetBuyVolumeByDaymBTC
from RSMgetBuyVolumeByDayShares import RSMgetBuyVolumeByDayShares
from RSMgetSellVolumeByDaymBTC import RSMgetSellVolumeByDaymBTC
from RSMgetSellVolumeByDayShares import RSMgetSellVolumeByDayShares
from RSMgetCurrentTicker import RSMgetCurrentTicker
from RSMgetMarketOrdersByInterval import RSMgetMarketOrdersByInterval
from RSMgetMarketOrdersByAggregate import RSMgetMarketOrdersByAggegate
from RSMprintJSString import RSMprintJSString

print ("imports")

# Include Javascript Function String Function
from RSMgetJSString import RSMgetJSString
    

def main() :
    
    print("get marketdata")
    marketdata = RSMgetjson()
    tickerdata = marketdata[0]
    tradesdata = marketdata[1]
    depthsdata = marketdata[2]
    
    print(marketdata)
    
    print("End of Market Data Test")
    
    # Get all 
    gotPriceByDay = RSMgetPriceByDay(tradesdata, tickerdata)
    RSMprintJSString("PriceByDay.js", RSMgetJSString(gotPriceByDay, "PriceByDay"))
    print("end of Price By Day")
    
    gotAvgPriceByDay  = RSMgetAvgPriceByDay(tradesdata, tickerdata)
    RSMprintJSString("AvgPriceByDay.js", RSMgetJSString(gotAvgPriceByDay, "AvgPriceByDay"))
    print("End of Avg Price By day")
    
    gotBuyVolumeByDaymBTC  = RSMgetBuyVolumeByDaymBTC(tradesdata, tickerdata)
    RSMprintJSString("BuyVolumeByDaymBTC.js", RSMgetJSString(gotBuyVolumeByDaymBTC, "BuyVolumeByDaymBTC"))
    print("End of buy Volume By Day mBTC")
    
    gotBuyVolumeByDayShares = RSMgetBuyVolumeByDayShares(tradesdata, tickerdata)
    RSMprintJSString("BuyVolumeByDayShares.js", RSMgetJSString(gotBuyVolumeByDayShares, "BuyVolumeByDayShares"))
    print("Buy Volume By Day Shares")
    
    gotSellVolumeByDaymBTC = RSMgetSellVolumeByDaymBTC(tradesdata, tickerdata)
    RSMprintJSString("SellVolumeByDaymBTC.js", RSMgetJSString(gotSellVolumeByDaymBTC, "SellVolumeByDaymBTC"))
    print("Sell Volume By Day mBTC")
    
    gotSellVolumeByDayShares = RSMgetSellVolumeByDayShares(tradesdata, tickerdata)
    RSMprintJSString("SellVolumeByDayShares.js", RSMgetJSString(gotSellVolumeByDayShares, "SellVolumeByDayShares"))
    print("Sell Volume By Day Shares")
    
    gotCurrentTicker = RSMgetCurrentTicker(tickerdata, tradesdata)
    RSMprintJSString("CurrentTicker.js", RSMgetJSString(gotCurrentTicker, "CurrentTicker"))
    print("Current Ticker")
    
    gotMarketOrdersByInterval = RSMgetMarketOrdersByInterval(depthsdata, tickerdata)
    RSMprintJSString("MarketOrdersByInterval.js", RSMgetJSString(gotMarketOrdersByInterval, "MarketOrdersByInterval"))
    print("Got market Orders By Interval")
    
    gotMarketOrdersByAggregate = RSMgetMarketOrdersByAggegate(depthsdata, tickerdata)
    RSMprintJSString("MarketOrdersByAggregate.js", RSMgetJSString(gotMarketOrdersByAggregate, "MarketOrdersByAggregate"))
    print("Got Market Orders By Aggrgate")
    
    return
    
main()

