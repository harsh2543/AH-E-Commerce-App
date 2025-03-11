from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure image folder path
IMAGE_FOLDER = os.path.join(os.path.dirname(__file__), "images")


products = [
    {
        "id": 1,
        "name": "Adidas Ultraboost 22",
        "price": 189.99,
        "description": "Responsive running shoes with Primeknit upper",
        "image": "/images/IMG-20250301-WA0025.jpg",  # Must match actual filename
        "category": "Running"
    },
    {
        "id": 2,
        "name": "Adidas Stan Smith Sneakers",
        "price": 89.99,
        "description": "Classic leather tennis-inspired sneakers",
        "image": "/images/IMG-20250301-WA0022.jpg",
        "category": "Lifestyle"
    },
    {
        "id": 3,
        "name": "Adidas Tiro 21 Training Pants",
        "price": 59.99,
        "description": "Football-inspired training pants",
        "image": "/images/IMG-20250301-WA0020.jpg",
        "category": "Training"
    },
    {
        "id": 4,
        "name": "Adidas MESSI Football Studs",
        "price": 69.99,
        "description": "Football-inspired training studs",
        "image": "/images/IMG-20250301-WA0023.jpg",
        "category": "Training"
    }
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)