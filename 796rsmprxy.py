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
    
    ## Grab info For Ticker
    tickrequest = urllib.request.Request(tickurl)
    tickresponse = urllib.request.urlopen(tickrequest)
    tickxjson = json.loads((traderesponse.read().decode('utf-8')))
    
    ## Grab Info For Trades
    traderequest = urllib.request.Request(tradeurl)
    tradesponse = urllib.request.urlopen(traderequest)
    tradexjson = json.loads((traderesponse.read().decode('utf-8')))
    
    ## Creat String with JS Files
    tickproxyfile = "/var/api/ticker.js"
    tradeproxyfile = "/var/api/trades.js"
    
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
    
            
    ## Ticker and Trade
    ticker_string = tickbegin + str(tickxjson['ticker']) + "\"" + tradeend;
    trades_string = tradebegin + str(tradexjson[0]) + "\"" + tradeend;
    
    ## Log Ticker & Trade
    print ("Last Run")
    print (total_string)
    print (trades_string)
    
    ## Write Ticker File
    tickfile = open(tickproxyfile, 'w')
    tickfile.write(ticker_string)
    tickfile.close()
    
    ## Write Trades File
    tradefile = open(tradeproxyfile, 'w')
    tradefile.write(trades_string)
    tradefile.close()
    
    ## Log Writing
    print ("Wrote Files")
    
main()
    
    
    