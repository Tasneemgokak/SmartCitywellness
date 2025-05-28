import os
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.optimizers import Adam

# ==== Config ====
IMG_SIZE = 224  # MobileNetV2 requires at least 96x96, ideally 224x224
BATCH_SIZE = 32
EPOCHS = 30
DATA_DIR = "../DATASET"

# ==== Prepare Data ====
class_names = sorted(os.listdir(DATA_DIR))
print("Classes:", class_names, len(class_names))

datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
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

# ==== Load MobileNetV2 Base ====
base_model = MobileNetV2(input_shape=(IMG_SIZE, IMG_SIZE, 3),
                         include_top=False,
                         weights='imagenet')
base_model.trainable = False  # Freeze the convolutional base

# ==== Add Custom Layers ====
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)
predictions = Dense(len(class_names), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(optimizer=Adam(learning_rate=0.0001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

# ==== Callbacks ====
early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# ==== Train ====
model.fit(train_data, validation_data=val_data, epochs=EPOCHS, callbacks=[early_stop])

# ==== Save Model & Classes ====
model.save("waste_classifier_mobilenetv2.keras")

with open("classes.txt", "w") as f:
    for label in class_names:
        f.write(label + "\n")

print("MobileNetV2-based model and class list saved.")