# Faces README
The original code is in my Github repository. The code has been modified for the Wix.com version. 

 
## Github repository instructions
The `README.md` in the repository has the instructions for how to run the code through the Flask app (via a Python virtual environment). Like any web code, you can also view the code through a local web server (`python -m SimpleHTTPServer`) but the code has been modified to work with Flask/Jinja so you will see a lot of `{% %}`. 

### TODO [Upload Face]: Add the real CNN @Jonas
Currently I have a dummy class called `imagePredictor.py` that acts as the stand-in wrapper for the CNN. The file `faces.py` hosts the Flask app (i.e. it hosts the website and links everything together) and that is where upload-face creates an `imagePredictor` object and calls the `getCNNPrediction()` function from that object. Both Python files have comments about how to wire things together.

### TODO [Slider Vis] Use images from an election seed
Currently I am referencing mugshot-based images. Any new images need to be renamed to a hexcode-like convention to operate with the sliders; the file `CAAI-faces/static/slider-faces/metadata/renameImages.py`. The table below has the conversion. For example, if the sliders are at values `-1, 0, 0.25, 0`, then the corresponding code is `aefe` and the image is `seed_XYX_var_aefe.png`.

| Value | -1 | -0.75 | -0.5 | -0.25 | 0 | 0.25 | 0.5 | 0.75 | 1 |
|-------|----|-------|------|-------|---|------|-----|------|---|
| Code  | a  | b     | c    | d     | e | f    | g   | h    | i |

The file `renameImages.py` copies the records in `meta-combined.csv` and rewrites them with the new names in `meta-renamed.csv` AND it copies the old images from the old directory into a new directory with its new code-based name (e.g. from `../images_seed_200/seed_200_var_24.png` to `../renamed_images_200/seed_200_var_aacf.png`).

Run the code (`python3 renameImages.py`) to change the files. NOTE: if the naming conventions for the files are different, `renameImages.py` will need to be modified.



## Outstanding issues

### Sliders
Wix doesn't have a slider button (yet). Currently, the page gets around that by embedding an iframe -- Wix calls this ''adding a Custom Element." As a result, there are a lot of restrictions to using the iframe for Wix's own security reasons. Anything in the iframe cannot reference anything else on the webpage -- the contents of the iframe act like a different site. That means references to photos must be external (i.e. instead of ''./slider-faces/image_aaaa.png", the images are linked to GitHub because those links are accessible anywhere and are HTTPS links, rather than HTTP). This also means the style within the iframe (e.g. the font, the colors) must be written by hand; you can't inherit the webpage's existing CSS style sheet.   

###Add instructions for deployment onto server #14
Closing the issue since we are hosting the files on Wix (with significant modifications). Connecting Python code to the Wix pages seems like it might be possible with web modules. Another option is a Jupyter notebook, since Wix can display Python notebooks (I haven't delved into the documentation for this).

###Delete uploaded files #9
Add code to faces.py to delete existing uploaded images in static/uploaded-faces/.
Options:
SIMPLE: delete all contents of directory at start of script
causes issue if person A uploads file, then person B deletes all files, then person A can't view their file
COMPLICATED: delete the oldest contents of the directory at the start of script
need to sort files by date/time and remove ones more than 00:15:00 old (15 min -- or read time of the article)




