import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# ==== Config 
IMG_SIZE = 128
BATCH_SIZE = 32
EPOCHS = 10
DATA_DIR = "../DATASET/TRAIN"


# ==== Prepare Data
class_names = sorted(os.listdir(DATA_DIR))
print("Classes:", class_names)

datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    DATA_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_data = datagen.flow_from_directory(
    DATA_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# ==== Model Code 
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.4),
    Dense(9, activation='softmax')  # Use len(class_names) for dynamic class count or 9 is for fixed
])


model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

# ==== Train Model 
model.fit(train_data, validation_data=val_data, epochs=EPOCHS)

# ==== Save Model & Classes 
model.save("waste_classifier_model.h5")

with open("classes.txt", "w") as f:
    for label in class_names:
        f.write(label + "\n")

# Just to confirm
print("Model and class list saved.")
