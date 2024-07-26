from .imports import *


class CreateAccount(APIView):
    authentication_classes=()
    permission_classes=()

    def get(self, request, *args, **kwargs):

        try:
            account_obj = Account.objects.all()
            account_serializer = AccountSerializer(account_obj,many=True)

            return Response(account_serializer.data,status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors":str(e)},status.HTTP_400_BAD_REQUEST)
        
