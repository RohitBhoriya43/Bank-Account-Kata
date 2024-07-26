from .imports import *


class WithdrawBalance(APIView):
    authentication_classes=()
    permission_classes=()

    def post(self, request, *args, **kwargs):

        try:
            iban,account_obj = check_account_object(request.data.get("iban"),True)
            balance = request.data.get("balance")
            create_transaction(account_obj,balance,False,True)

            return Response({"message":"withdraw completed"},status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"errors":str(e)},status.HTTP_400_BAD_REQUEST)
        
