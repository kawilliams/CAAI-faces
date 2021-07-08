#readFeather.py

# import pyarrow.feather as feather

# df = feather.read_feather('metadata_seed_200.feather')


# #Find my image -1 0.75 0 -0.5
# slider1 = df[df["slider_1"] == -1]
# slider2 = slider1[slider1["slider_2"] == 0.75]
# slider3 = slider2[slider2["slider_3"] == 0]
# slider4 = slider3[slider3["slider_4"] == -0.5]
# print(slider4)
# print(slider4["image_id"])

import csv
#Rename images
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

tempCSV = []

with open('meta_combined.csv') as csvfile:
	r = csv.reader(csvfile)
	for row in r:
		if (row[slider_1] == 'slider_1'):
			pass
		else:
			strVal1 = str(row[slider_1])
			strVal2 = str(row[slider_2])
			strVal3 = str(row[slider_3])
			strVal4 = str(row[slider_4])
			alpha1 = sliderCode[strVal1]
			alpha2 = sliderCode[strVal2]
			alpha3 = sliderCode[strVal3]
			alpha4 = sliderCode[strVal4]
			newCode = alpha1+alpha2+alpha3+alpha4
			newName = 'seed_200_var_' + newCode + '.png'
			row = row + [newName]
			tempCSV = tempCSV + [row]


with open('meta_renamed.csv', mode='w') as csvfile:
	w = csv.writer(csvfile)
	for i in range(len(tempCSV)):
		w.writerow(tempCSV[i])

