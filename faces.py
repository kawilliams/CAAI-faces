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

UPLOAD_FOLDER = 'static/uploaded-faces'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1024*1024

def evaluateImage():
	prediction = 2222222
	return prediction

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
	if upload_file.filename != '':
		upload_file.save(os.path.join(app.config['UPLOAD_FOLDER'], upload_file.filename))
		yourPrediction = evaluateImage()
	return render_template('booth-faces.html', error=error, yourPrediction=yourPrediction)


# @app.route("/", methods=['POST']) #,'GET'])
# def showGANPrediction(yourPrediction=None):
# 	error = None
# 	if request.method == 'POST':
# 		print("KATY: post")
# 		if 'file' not in request.files:
# 			#flash('No file attached')
# 			return redirect(request.url)
# 		f = request.files['file']
# 		if f.filename == '':
# 			#flash('No file selected')
# 			return redirect(request.url)
# 		if f and allowed_file(f.filename):
# 			print("KATY: we have a filename")
# 			filename = secure_filename(f.filename)
# 			f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
# 			print("SAVED the file", filename)
# 			return redirect(url_for('index'), yourPrediction=yourPrediction, error=error)

	
# 	yourPrediction = evaluateImage()
# 	return render_template('booth-faces.html', yourPrediction=yourPrediction, error=error)
	
