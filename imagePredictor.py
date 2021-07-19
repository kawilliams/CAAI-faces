import tensorflow as tf
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import ssl

#To ensure server security
ssl._create_default_https_context = ssl._create_unverified_context

UPLOAD_FOLDER = 'static/uploaded-faces/'

class ImagePredictor:
	def __init__(self, filename):
		self.filename = UPLOAD_FOLDER + filename
		print(self.filename)

	def getCNNPrediction(self):
		img=Image.open(self.filename).resize((224, 224))
		img_array = image.img_to_array(img)
		img_batch = np.expand_dims(img_array, axis=0)
		img_preprocessed = preprocess_input(img_batch)
		model = tf.keras.applications.resnet50.ResNet50()
		prediction = model.predict(img_preprocessed)

		return (decode_predictions(prediction, top=1)[0][0][2])
