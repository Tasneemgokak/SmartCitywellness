import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# === Load model
model = load_model("waste_classifier_model.h5")

# === Load class names 
with open("classes.txt", "r") as f:
    class_names = [line.strip() for line in f.readlines()]

# === Load and preprocess image
img_path = "image.png"  # Replace with your image path
img = image.load_img(img_path, target_size=(128, 128))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# === Predict 
prediction = model.predict(img_array)
predicted_class = class_names[np.argmax(prediction)]

print("✅ Prediction:", predicted_class)


if(predicted_class == "Glass" or predicted_class == "Metal"): 
    print("High Level of waste")

elif(predicted_class == "Organic" or predicted_class == "Recycle"):
    print("Medium Level of waste")
else:
    print("Low Level of waste")