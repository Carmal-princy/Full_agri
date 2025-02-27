from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import os

# ✅ Prevents 404 error when visiting http://127.0.0.1:8000/
def home(request):
    return JsonResponse({"message": "Welcome to AI-driven Market Analysis API"})

# ✅ Handles dataset upload
def upload_dataset(request):
    if request.method == 'POST' and request.FILES.get('file'):
        dataset = request.FILES['file']
        file_path = os.path.join('uploads', dataset.name)

        # Save the file
        with open(file_path, 'wb+') as destination:
            for chunk in dataset.chunks():
                destination.write(chunk)

        return JsonResponse({"message": "File uploaded successfully", "file": dataset.name})
    return JsonResponse({"error": "Invalid request"}, status=400)

# ✅ Dummy function for price prediction (implement ML model here)
def predict_price(request):
    sample_prediction = {
        "crop": "Wheat",
        "predicted_price": 1800
    }
    return JsonResponse(sample_prediction)
