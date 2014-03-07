#!/usr/bin/env python3

# Includes Here

import json
import urllib.request
import logging
import sys

# Include SubFunctions
from RSMgetjson import RSMgetjson
from RSMgetPriceByDay import RSMgetPriceByDay
from RSMgetAvgPriceByDay import RSMgetAvgPriceByDay
from RSMgetBuyVolumeByDaymBTC import RSMgetBuyVolumeByDaymBTC
from RSMgetBuyVolumeByDayShares import RSMgetBuyVolumeByDayShares
from RSMgetSellVolumeByDaymBTC import RSMgetSellVolumeByDaymBTC
from RSMgetSellVolumeByDayShares import RSMgetSellVolumeByDayShares
from RSMgetCurrentTicker import RSMgetCurrentTicker
from RSMgetMarketOrdersByInterval import RSMgetMarketOrdersByInterval
from RSMgetMarketOrdersByAggregate import RSMgetMarketOrdersByAggegate

# Include Javascript Function String Function
from RSMgetJSString import RSMgetJSString


def main() :
    marketdata = RSMgetjson()
    tickerdata = marketdata[0]
    tradesdata = marketdata[1]
    depthsdata = marketdata[2]
    
    print("In Main")
    print(tickerdata)
    print(RSMgetJSString(tickerdata, "TickerData"))

main()
