#from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging
from rest_framework.decorators import api_view
from django.http import JsonResponse

from .models import Course_table


logger = logging.getLogger('django')
 
# class HelloApiView (APIView):
#     def get(self,request):
#         my_name=request.GET.get('name', None)
#         logger.debug("********** myhello_api:" + my_name)
#         if my_name:
#             retValue={}
#             retValue['data']='hello' + my_name

#             return Response(retValue,status=status.HTTP_200_OK)
#         else:
#             return Response(
#                 {"res": "parameter: name is None"},
#                 status =status.HTTP_400_BAD_REQUEST
#             )

@api_view(['GET'])
def addcourse(request):
    Department = request.GET.get('Department' , '')
    CourseTitle = request.GET.get('CourseTitle' , '')
    Instructor = request.GET.get('Instructor' , '')

    
    if Department:
        new_course = Course_table()
        new_course.Department = Department
        new_course.CourseTitle = CourseTitle
        new_course.Instructor = Instructor
        new_course.save()
        
        logger.debug(" ************** myhello_api: " + Department)
        
        return JsonResponse({"data": Department + " insert!"})
    else:
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def listcourse(request):
    course = Course_table.objects.all().values()
    return JsonResponse(list(course), safe=False)
    #return Response({"data": 
                    #  json.dumps(
                    #      list(posts),
                    #      sort_keys = True,
                    #      indent = 1,
                    #      cls = DjangoJSONEncoder)},
                    # status=status.HTTP_200_OK)
