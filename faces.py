#analyzeFace.py
"""
Flask script to call functions to analyze images.

Installed Flask in a virtual environment (venv/).

"""
import os
from flask import Flask, flash, request, render_template, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploaded-faces'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def evaluateImage():
	prediction = 2222222
	return prediction

@app.route("/", methods=['POST','GET'])
def showGANPrediction(yourPrediction=None):
	error = None
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file attached')
			return redirect(request.url)
		f = request.files['file']
		if f.filename == '':
			flash('No file selected')
			return redirect(request.url)
		if f and allowed_file(f.filename):
			filename = secure_filename(f.filename)
			f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			return redirect(url_for('download_file'), name=filename)

	
	yourPrediction = evaluateImage()
	return render_template('booth-faces.html', yourPrediction=yourPrediction, error=error)
