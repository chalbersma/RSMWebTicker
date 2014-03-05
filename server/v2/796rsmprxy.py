#!/usr/bin/env python3

# Includes Here
from RSMgetjson import RSMgetjson
import json
import urllib.request
import logging
import sys

def main() :
    marketdata = RSMgetjson()
    tickerdata = marketdata[0]
    tradesdata = marketdata[1]
    depthsdata = marketdata[2]

    

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
        
    
    
