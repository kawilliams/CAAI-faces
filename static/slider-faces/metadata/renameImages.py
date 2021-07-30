#Rename the images to support lookup

import csv
import os
import shutil


# The index numbers of the columns in meta_combined.csv
row_num = 0
img_name = 1
image_id = 2
image_seed = 3
slider_1 = 4
slider_2 = 5
slider_3 = 6
slider_4 = 7
pred_release = 8
slider_value_sum = 9
new_img_name = 10

sliderCode = {
	'-1' : 'a',
	'-0.75' : 'b',
	'-0.5' : 'c',
	'-0.25' : 'd',
	'0' : 'e',
	'0.25' : 'f',
	'0.5' : 'g',
	'0.75' : 'h',
	'1' : 'i'
}


"""
*** createNewCodes

Creates a hexcode-like code for each image. 
The image is given a name that represents the 
values of each of the four sliders.

e.g. the image seed_200_var_6372.png has the 
slider values 1, 0.5, 0.25, 1. The new image code
is i g f i, so the image is renamed to seed_200_var_igfi.png
"""
def createNewCodes(): 
	tempCSV = []
	faceSeeds = ['124', '200']
	for faceseed in faceSeeds:
		with open('meta_combined.csv') as csvfile:
			r = csv.reader(csvfile)
			for row in r:
				if (row[slider_1] == 'slider_1'):
					pass
				else:
					
					if row[image_seed] == faceseed:
						strVal1 = str(row[slider_1])
						strVal2 = str(row[slider_2])
						strVal3 = str(row[slider_3])
						strVal4 = str(row[slider_4])
						alpha1 = sliderCode[strVal1]
						alpha2 = sliderCode[strVal2]
						alpha3 = sliderCode[strVal3]
						alpha4 = sliderCode[strVal4]
						newCode = alpha1+alpha2+alpha3+alpha4
						newName = 'seed_'+faceseed+'_var_' + newCode + '.png'
						row = row + [newName]
						tempCSV = tempCSV + [row]

	print(len(tempCSV), 2*6561)
	return tempCSV

"""
*** writeNewCodes
Write the temporary CSV list into a new csv file
"""
def writeNewCodes(tempCSV):
	with open('meta_renamed.csv', mode='w') as csvfile:
		w = csv.writer(csvfile)
		for i in range(len(tempCSV)):
			w.writerow(tempCSV[i])



""" 
*** makeNewCopiesOfImages
Read the new image names and copy the old source
image from images/ to renamed_images/
"""
def makeNewCopiesOfImages():
	count = 0
	count200 = 0
	count124 = 0
	oldDir = '../images/'
	newDir = '../unused_images/'
	with open('meta_renamed.csv') as csvfile:
		r = csv.reader(csvfile)
		for row in r:
			count+=1
			if (row[slider_1] == 'slider_1'):
				pass
			else:
				if row[image_seed] == "200":
					oldDir = '../images_seed_200/'
					newDir = '../renamed_images_200/'
					count200 += 1
				elif row[image_seed] == "124":
					oldDir = '../images_seed_124/'
					newDir = '../renamed_images_124/'
					count124 += 1
				else:
					pass
				source = oldDir + row[img_name]

				#Check if file exists
				if os.path.exists(source):
					dest = newDir + row[new_img_name]
					#if exists, copy it into the new directory
					shutil.copy(source, dest)
			if count % 1000 == 0:
				print(count, " 200:", count200, " 124:", count124)
	return


def main():
	print("\n\nCreate the new codes for 124 and 200")
	tempCSVlist = createNewCodes()
	print("\n\nWrite the csv into meta_renamed.csv")
	writeNewCodes(tempCSVlist)
	print("\n\nCopy each image into the new directory with its new name")
	makeNewCopiesOfImages()

	return

if __name__ == '__main__':
	main()

