#imagePredictor.py

import sys
import os

UPLOAD_FOLDER = 'static/uploaded-faces/'


class ImagePredictor:
	def __init__(self, filename):
		self.filename = UPLOAD_FOLDER + filename
		print(self.filename)
		
	def callDummyFunction(self):
		fsize = os.path.getsize(self.filename)
		return fsize

def main():
	print("Number of arguments: ", len(sys.argv))
	print("Argument list: ", str(sys.argv))

	imagename = sys.argv[1]
	image = ImagePredictor(imagename)
	print("Size:", image.callDummyFunction())

	return

if __name__ == '__main__':
	main()