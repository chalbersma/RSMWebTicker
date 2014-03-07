#!/usr/bin/env python3

# RSMgetJSString.py
# Takes dataarray & functionname and returns a string that contains the javascript function 

def RSMgetJSString(dataarray, functionname):
  jsFunctionName = str(functionname)
  jsData = str(dataarray)
  # Convert ' to " on jsData
  jsData = jsData.replace("\'", "\\\"");
  
  jsFunctionInit = '''function '''
  jsFunctionMore = '''(){
    var datatoreturn = "'''
  jsFunctionEnd = '''";
    return datatoreturn;
    }
    '''
  
  jsFunction = jsFunctionInit + jsFunctionName + jsFunctionMore + jsData + jsFunctionEnd
  
  return jsFunction
