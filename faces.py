#analyzeFace.py
"""
Flask script to call functions to analyze images.

Installed Flask in a virtual environment (venv/).

[ ] Limit file size
[ ] Only allow certain extensions
[ ] Use secure_filename() around filename

"""
import os
from flask import Flask, request, render_template, redirect, url_for
from werkzeug.utils import secure_filename
from imagePredictor import ImagePredictor

UPLOAD_FOLDER = 'static/uploaded-faces'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#app.config['MAX_CONTENT_LENGTH'] = 5*1024 #*1024

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def index():
	return render_template('booth-faces.html')

@app.route("/", methods=["POST"])
def upload_file():
	error = None
	if 'fileToUpload' not in request.files:
		error = 'No file attached'
		return redirect(url_for('index'))
	
	upload_file = request.files['fileToUpload']
	if upload_file.filename == '':
		error = "No file selected"
		return render_template('booth-faces.html', error=error)
	

	# if katy:
	# 	error = "File is too large"
	# 	return render_template('booth-faces.html', error=error)

	#DELETE THIS "IF": This condition exists as a placeholder
	#for when the CNN cannot adequately process an image.
	#Replace with a "if the image is not a face" condition.
	if len(upload_file.filename) > 10:
		error = "Caution: the score for this image might be meaningless because it does not look similar to our training data."
	#end dummy condition

	if upload_file and allowed_file(upload_file.filename):

		safe_filename = secure_filename(upload_file.filename)
		upload_file.save(os.path.join(app.config['UPLOAD_FOLDER'], safe_filename))

		yourImagePredictor = ImagePredictor(safe_filename)
		yourPrediction = yourImagePredictor.getCNNPrediction()
		yourImage = UPLOAD_FOLDER+"/"+safe_filename

	return render_template('booth-faces.html', set_tab=1, error=error, yourPrediction=yourPrediction, yourImage=yourImage, imageName=safe_filename)
	
