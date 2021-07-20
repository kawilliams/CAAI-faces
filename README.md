# CAAI-faces
Visualizations for the Faces Project from the CAAI

## Requirements
Python 3

## To display the visualizations
Since we need to interact with a Python wrapper for the CNN, the webpage is now a [Flask](https://flask.palletsprojects.com/en/2.0.x/) app. To see the webpage, first clone the repository, then `cd CAAI-faces` and activate the virtual environment:
```
. venv/bin/activate
```
Next we need to install the Python modules needed to run the CNN into our virtual environment:
```
pip install -r requirements.txt
```
Now we need to tell Flask the name of our app and that we are running in development mode:
```
export FLASK_APP=faces
export FLASK_ENV=development
```
Then we can run the Flask app:
```
flask run
```
And the following should appear:
```
(venv) <<Your Username>>:CAAI-faces <<Your Username>>$ flask run
 * Serving Flask app 'faces.py' (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 869-640-629
```
Open a browser tab and navigate to http://127.0.0.1:5000/. The Chicago Booth webpage should appear.

To stop hosting the webpage, press `CTRL+C`. To deactivate the virtual environment, type `deactivate` into the terminal.

