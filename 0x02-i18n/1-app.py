#!/usr/bin/env python3
"""Instantiation of Babel extension in flask app"""


from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
app.url_map.strict_slashes = False
babel = Babel(app)


class Config:
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


@app.route('/')
def index() -> str:
    """Default page"""
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
