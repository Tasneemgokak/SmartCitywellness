import os

DATA_DIR = "../DATASET"


# ==== Prepare Data
class_names = sorted(os.listdir(DATA_DIR))


print(len(class_names))  # or however you get your class names
