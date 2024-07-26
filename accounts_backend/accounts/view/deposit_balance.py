from .imports import *


class DepositBalance(APIView):
    authentication_classes=()
    permission_classes=()

    def post(self, request, *args, **kwargs):

        try:
            iban,account_obj = check_account_object(request.data.get("iban"),True)
            balance = request.data.get("balance")
            create_transaction(account_obj,balance,True,False)
            

            return Response({"message":"Transaction is completed"},status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"errors":str(e)},status.HTTP_400_BAD_REQUEST)
        
