from django.db import models

class CropData(models.Model):
    district = models.CharField(max_length=100)
    month = models.CharField(max_length=20)
    season = models.CharField(max_length=20)
    crop = models.CharField(max_length=50)
    rainfall = models.FloatField()
    temperature = models.FloatField()
    soil_quality = models.FloatField()
    market_rate = models.FloatField()  # Target variable (Price)

    def __str__(self):
        return f"{self.crop} - {self.district}"
