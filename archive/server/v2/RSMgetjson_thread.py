#!/usr/bin/env python3

# RSMgetjson.py -
# Includes a function that grabs the latest data and converts it to a
# json object for processing.

import json
import urllib.request
import threading

def RSMgetjson():
 
  url = [ "http://api.796.com/v3/stock/ticker.html?type=rsm", "http://api.796.com/v3/stock/trades.html?type=rsm",  "http://api.796.com/v3/stock/depth.html?type=rsm" ]
  xjson = [ "" , "" , "" ]
  threads = [None] * url.__len__()
  
    
  
  for i in range(url.__len__()) :
    xjson[i] = unitGetJson(url[i])
    #print(xjson[i])
      
  
  ## return items in array
  return xjson
  
def unitGetJson(thisurl):
  thisrequest = urllib.request.Request(thisurl)
  thisresponse = urllib.request.urlopen(thisrequest)
  thisxjson = json.loads((thisresponse.read().decode('utf-8')))
  #print (thisxjson)
  return thisxjson
