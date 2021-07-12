#simpleFunction.py

import sys
import os

def callDummyFunction(imagename):
	fsize = os.path.getsize(imagename)
	return fsize

def main():
	print "Number of arguments: ", len(sys.argv)
	print "Argument list: ", str(sys.argv)

	imagename = sys.argv[1]
	print "Size:", callDummyFunction(imagename)

	return

if __name__ == '__main__':
	main()