import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor

# Load dataset
df = pd.read_excel("dataset.xlsx")  # Ensure dataset.xlsx is in the same directory

# Print column names to verify
print("Dataset Columns:", df.columns.tolist())

# Define the correct target column
target_column = "MARKET RATE(per kg)(in Rupees)"  # Fix: Correct column name

if target_column not in df.columns:
    raise ValueError(f"❌ Column '{target_column}' not found. Check the dataset!")

# Check for NaN values in target column
if df[target_column].isna().sum() > 0:
    print("⚠️ Warning: Missing values found in target column! Filling them with median value.")
    df[target_column].fillna(df[target_column].median(), inplace=True)  # Fix: Replace NaN with median

# Separate features and target variable
X = df.drop(columns=[target_column])
y = df[target_column]

# Encode categorical features
label_encoders = {}
for col in X.select_dtypes(include=["object"]).columns:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# Save label encoders
with open("label_encoders.pkl", "wb") as file:
    pickle.dump(label_encoders, file)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model
with open("model.pkl", "wb") as file:
    pickle.dump(model, file)

print("✅ Model trained and saved successfully!")
