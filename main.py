from flask import Flask, render_template


app = Flask(__name__)

@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

@app.route("/")
def index():
	return render_template("index.html")


if __name__ == "__main__":
	app.run()
