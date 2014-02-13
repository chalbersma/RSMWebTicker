#!/usr/bin/env python3


# Includes Here
import json
import urllib.request
import logging
import sys

def main() :
    url = "http://api.796.com/v3/stock/ticker.html?type=rsm"
    
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)
    xjson = json.loads((response.read().decode('utf-8')))
    
    print (xjson)
    
    proxyfile = "/var/api/ticker.js"
    
    beginning_of_function = '''
        function ticker(){
            var tickerstring = "'''
    
    end_of_function = '''
            
            return tickerstring;
            }
            '''
    
    
    total_string = beginning_of_function + str(xjson['ticker']) + "\"" + end_of_function;
    print (total_string)
    myfile = open(proxyfile, 'w')
    
    myfile.write(total_string)
    myfile.close()
    
    
main()
    
    
    