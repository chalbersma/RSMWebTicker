#!/usr/bin/env python3

# Includes Here
import json
import urllib.request
import logging
import sys

def main() :
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
    
    ## Creat String with JS Files
    tickproxyfile = "/var/api/ticker.js"
    tradeproxyfile = "/var/api/trades.js"
    depthproxyfile = "/var/api/depth.js"
    
    ## Create static ticker Info
    tickbegin = '''
        function ticker(){
            var tickerstring = "'''
    
    tickend = '''
            
            return tickerstring;
            }
            '''
            
            
    ## Create Static Trade Info
    tradebegin = '''
        function trades(){
            var tradesstring = "'''
    
    tradeend = '''
            
            return tradesstring;
            }
            '''
    
    ## Create Static Depth Info
    depthbegin = '''
    function depth(){
    var depthstring = "'''
    			
    depthend = '''
    	
    return depthstring;
    }
    '''
            
    ## Ticker and Trade
    ticker_string = tickbegin + str(tickxjson['ticker']) + "\"" + tickend;
    trades_string = tradebegin + str(tradexjson) + "\"" + tradeend;
    depth_string = depthbegin + str(depthxjson) + "\"" + depthend;
    
    ## Replace ' with " to meet JSON Lint Requirements
    ticker_string = ticker_string.replace("\'", "\\\"");
    trades_string = trades_string.replace("\'", "\\\"");
    depth_string = depth_string.replace("\'", "\\\"");
    
   
    ## Log Ticker & Trade
    print ("Last Run")
    print (ticker_string)
    print (trades_string)
    print (depth_string)
    
    ## Write Ticker File
    tickfile = open(tickproxyfile, 'w')
    tickfile.write(ticker_string)
    tickfile.close()
    
    ## Write Trades File
    tradefile = open(tradeproxyfile, 'w')
    tradefile.write(trades_string)
    tradefile.close()
    
    ## Write Depth File
    depthfile = open(depthproxyfile, 'w')
    depthfile.write(depth_string)
    depthfile.close()
    
    ## Log Writing
    print ("Wrote Files")
    
main()
    
    
    
