from django.db import models

# Create your models here.


class Course_table(models.Model):
    Department = models.CharField(max_length=100)
    CourseTitle = models.CharField(max_length=100)
    Instructor = models.CharField(max_length=100)
