#Rename the images to support lookup

import csv
import os
import shutil


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

oldDir = '../images/'
newDir = '../renamed_images/'
count = 0
with open('meta_renamed.csv') as csvfile:
	r = csv.reader(csvfile)
	for row in r:
		count+=1
		if (row[slider_1] == 'slider_1'):
			pass
		else:
			source = oldDir + row[img_name]

			#Check if file exists
			if os.path.exists(source):
				dest = newDir + row[new_img_name]
				#if exists, rename it
				# os.rename(source, dest)
				shutil.copy(source, dest)
		if count % 100 == 0:
			print(count)