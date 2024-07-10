# # Django Import
# from django.core import paginator
# from django.shortcuts import render
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# from rest_framework import status

# # Rest Framework Import
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from rest_framework.serializers import Serializer


# # Local Import
# from base.products import products
# from base.models import *
# from base.serializers import ProductSerializer

# # Get all the products with query


# @api_view(['GET'])
# def getProducts(request):
#     query = request.query_params.get('keyword')
#     if query == None:
#         query = ''

#     products = Product.objects.filter(name__icontains=query).order_by('-_id')

#     page = request.query_params.get('page')
#     paginator = Paginator(products, 8)

#     try:
#         products = paginator.page(page)
#     except PageNotAnInteger:
#         products = paginator.page(1)
#     except EmptyPage:
#         products = paginator.page(paginator.num_pages)

#     if page == None:
#         page = 1
#     page = int(page)

#     serializer = ProductSerializer(products, many=True)
#     return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

# # Top Products
# @api_view(['GET'])
# def getTopProducts(request):
#     products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)


# # Get single products
# @api_view(['GET'])
# def getProduct(request, pk):
#     product = Product.objects.get(_id=pk)
#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)


# # Create a new Product
# @api_view(['POST'])
# @permission_classes([IsAdminUser])
# def createProduct(request):

#     user = request.user
#     product = Product.objects.create(
#         user=user,
#         name=" Product Name ",
#         price=0,
#         brand="Sample brand ",
#         countInStock=0,
#         category="Sample category",
#         description=" "
#     )

#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)

# # Update single products


# @api_view(['PUT'])
# @permission_classes([IsAdminUser])
# def updateProduct(request, pk):
#     data = request.data
#     product = Product.objects.get(_id=pk)

#     product.name = data["name"]
#     product.price = data["price"]
#     product.brand = data["brand"]
#     product.countInStock = data["countInStock"]
#     product.category = data["category"]
#     product.description = data["description"]

#     product.save()

#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)


# # Delete a product
# @api_view(['DELETE'])
# @permission_classes([IsAdminUser])
# def deleteProduct(request, pk):
#     product = Product.objects.get(_id=pk)
#     product.delete()
#     return Response("Product deleted successfully")


# # Upload Image
# @api_view(['POST'])
# def uploadImage(request):
#     data = request.data
#     product_id = data['product_id']
#     product = Product.objects.get(_id=product_id)
#     product.image = request.FILES.get('image')
#     product.save()
#     return Response("Image was uploaded")


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createProductReview(request, pk):
#     user = request.user
#     product = Product.objects.get(_id=pk)
#     data = request.data

#     # 1 Review already exists
#     alreadyExists = product.review_set.filter(user=user).exists()

#     if alreadyExists:
#         content = {'detail': 'Product already reviewed'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)

#     # 2 No Rating or 0
#     elif data['rating'] == 0:
#         content = {'detail': 'Please Select a rating'}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)

#     # 3 Create review
#     else:
#         review = Review.objects.create(
#             user=user,
#             product=product,
#             name=user.first_name,
#             rating=data['rating'],
#             comment=data['comment'],
#         )

#         reviews = product.review_set.all()
#         product.numReviews = len(reviews)

#         total = 0

#         for i in reviews:
#             total += i.rating
#         product.rating = total / len(reviews)
#         product.save()

#         return Response('Review Added')

from rest_framework import generics, permissions
from rest_framework.response import Response
from base.models import Course, Subscription
from base.serializers import CourseSerializer, SubscriptionSerializer


# Create Course (Admin/SuperUser)
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]


# Delete Course (Admin/SuperUser)
class CourseDeleteView(generics.DestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]


# List All Courses (Anyone)
class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

# Get Courses Subscribed by Current User (Authenticated)
class UserSubscribedCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.filter(subscription__user=user)


# Retrieve Course Detail (Anyone)
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]


# Update Course (Admin/SuperUser)
class CourseUpdateView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]



# Retrieve Course Detail with Subscribed Users (Admin/SuperUser)
class CourseDetailWithSubscriptionsView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        subscriptions = Subscription.objects.filter(course=instance)
        subscription_serializer = SubscriptionSerializer(subscriptions, many=True)
        data = serializer.data
        data['subscriptions'] = subscription_serializer.data
        return Response(data)