#analyzeFace.py
"""
Flask script to call functions to analyze images.

Installed Flask in a virtual environment (venv/).

"""
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def showGANPrediction():
	return render_template('booth-faces.html')
