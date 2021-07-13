# CAAI-faces
Visualizations for the Faces Project from the CAAI

## To display the visualizations
Since we need to interact with a Python wrapper for the CNN, the webpage is now a [Flask](https://flask.palletsprojects.com/en/2.0.x/) app. To see the webpage, first clone the repository, then `cd CAAI-faces` and activate the virtual environment:
```
. venv/bin/activate
```
Now we can run the Flask app:
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

## Troubleshooting
If an error arises locating or identifying the Flask app, try the following:
```
export FLASK_APP=faces
```

If an error arises involving something with the environment or "development", try the following:
```
export FLASK_ENV=development
flask run
```

