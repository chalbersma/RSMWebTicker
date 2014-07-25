#!/usr/bin/env python3

# RSM Print JS String

import os

def RSMprintJSString(filename_string, file_content_string):


  target_dir="js/"

  fullname = os.path.join(target_dir, filename_string)
  with open(fullname, "w") as thejsfile:
    thejsfile.write(file_content_string)
  
  return
