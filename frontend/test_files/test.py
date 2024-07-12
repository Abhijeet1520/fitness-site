def Snippet_List(APIView):

    def get(self, request, format=None):
        snippet = Snippet.objects.all()
        serializer = SnippetSerializer(snippet, many=True)
        return Response(serializer.data)
    


    def post(self, request, format=None):
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_404_BAD_REQUEST)

        
def Snippet(APIView):

    def get_object(self, pk):
        try:
            return Snippet.object.get(pk=pk) 
        except Snippet.DoesNotExist:
            return Http404
        
    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet, data=request.data)
        return Response(serializer.data)
    
    def post(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = SnippetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_401_CREATED)
        return Response(serializer.data, status=status.HTTP_404_BAD_REQUEST)
    
    def get_snippets_by_id(self, request, pk, format=None):
        user = self.get_object(pk)

        snippets
