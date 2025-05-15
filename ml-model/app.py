from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask_cors import CORS
from io import BytesIO
import numpy as np
import os

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}}, supports_credentials=True)

# Load model and classes
model = load_model("waste_classifier_model.h5")
with open("classes.txt", "r") as f:
    class_names = [line.strip() for line in f.readlines()]


@app.route("/", methods=["GET"])
def home():
    return "Flask server is running"

@app.route("/predict", methods=['POST'])
def predict():
    print("✅ /predict endpoint was hit")

    if 'file' not in request.files:
        print("❌ No file part in the request")
        return jsonify({"error": "No file uploaded"}), 400

    img_file = request.files['file']
    print(f"📁 Received file: {img_file.filename}")

    try:
        # img = image.load_img(img_file, target_size=(128, 128))
        img = image.load_img(BytesIO(img_file.read()), target_size=(128, 128))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)
        predicted_class = class_names[np.argmax(prediction)]

        print(f"🔍 Prediction: {predicted_class} (Confidence: {np.max(prediction):.2f})")

        return jsonify({
            "prediction": predicted_class,
            "confidence": float(np.max(prediction))
        })
    
    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return jsonify({"error": "Prediction failed"}), 500


if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
