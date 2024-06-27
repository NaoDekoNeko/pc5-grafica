import tempfile
import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('main_html.html')

@app.route("/rostros")
def rostros():
    return render_template('main_html_face.html')

@app.route("/pg")
def pg():
    return render_template('index_pg.html')

@app.route("/static/<path:path>")
def send_static(path):
    return send_from_directory('static', path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050)