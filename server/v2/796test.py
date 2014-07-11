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

print ("imports")

# Include Javascript Function String Function
from RSMgetJSString import RSMgetJSString
    

def main() :
    
    print("get marketdata")
    marketdata = RSMgetjson()
    tickerdata = marketdata[0]
    tradesdata = marketdata[1]
    depthsdata = marketdata[2]
    
    print("test of function")
    print(marketdata)
    
    print("End of Market Data Test")
    
    # Get all 
    gotPriceByDay = RSMgetPriceByDay(tradesdata, tickerdata)
    print("end of Price By Day")
    gotAvgPriceByDay  = RSMgetAvgPriceByDay(tradesdata, tickerdata)
    print("End of Avg Price By day")
    gotBuyVolumeByDaymBTC  = RSMgetBuyVolumeByDaymBTC(tradesdata, tickerdata)
    print("End of buy Volume By Day mBTC")
    gotBuyVolumeByDayShares = RSMgetBuyVolumeByDayShares(tradesdata, tickerdata)
    print("Buy Volume By Day Shares")
    gotSellVolumeByDaymBTC = RSMgetSellVolumeByDaymBTC(tradesdata, tickerdata)
    print("Sell Volume By Day mBTC")
    gotSellVolumeByDayShares = RSMgetSellVolumeByDayShares(tradesdata, tickerdata)
    print("Sell Volume By Day Shares")
    gotCurrentTicker = RSMgetCurrentTicker(tickerdata, tradesdata)
    print("Current Ticker")
    gotMarketOrdersByInterval = RSMgetMarketOrdersByInterval(depthsdata, tickerdata)
    print("Got market Orders By Interval")
    gotMarketOrdersByAggregate = RSMgetMarketOrdersByAggegate(depthsdata, tickerdata)
    print("Got Market Orders By Aggrgate")
    
    return
    
main()

