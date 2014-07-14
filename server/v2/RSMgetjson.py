#!/usr/bin/env python3

# RSMgetjson.py -
# Includes a function that grabs the latest data and converts it to a
# json object for processing.

import json
import urllib.request

def RSMgetjson():
 
  url = [ "http://api.796.com/v3/stock/ticker.html?type=rsm", "http://api.796.com/v3/stock/trades.html?type=rsm",  "http://api.796.com/v3/stock/depth.html?type=rsm" ]
  xjson = []
  
  for i in url :
    xjson.append(unitGetJson(i))    
  
  ## return items in array
  return xjson
  
def unitGetJson(thisurl):
  thisrequest = urllib.request.Request(thisurl)
  thisresponse = urllib.request.urlopen(thisrequest)
  thisxjson = json.loads((thisresponse.read().decode('utf-8')))
  
  return thisxjson
