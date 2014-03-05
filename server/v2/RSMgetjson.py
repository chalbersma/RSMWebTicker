#!/usr/bin/env python3

# RSMgetjson.py -
# Includes a function that grabs the latest data and converts it to a
# json object for processing.


def RSMgetjson():
  # Ticker URL
  tickurl = "http://api.796.com/v3/stock/ticker.html?type=rsm"
  
  # Market Trades URL
  tradeurl = "http://api.796.com/v3/stock/trades.html?type=rsm"
  
  # Depth URL
  depthurl = "http://api.796.com/v3/stock/depth.html?type=rsm"

  ## Grab info For Ticker
  tickrequest = urllib.request.Request(tickurl)
  tickresponse = urllib.request.urlopen(tickrequest)
  tickxjson = json.loads((tickresponse.read().decode('utf-8')))

  ## Grab Info For Trades
  traderequest = urllib.request.Request(tradeurl)
  traderesponse = urllib.request.urlopen(traderequest)
  tradexjson = json.loads((traderesponse.read().decode('utf-8')))

  ## Grab Info For Depth
  depthrequest = urllib.request.Request(depthurl)
  depthresponse = urllib.request.urlopen(depthrequest)
  depthxjson = json.loads((depthresponse.read().decode('utf-8')))
  
  ## return items in array
  return [tickxjson, tradexjson, depthxjson]
