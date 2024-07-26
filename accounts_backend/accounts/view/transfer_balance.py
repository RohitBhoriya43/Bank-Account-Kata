from .imports import *


class TransferBalance(APIView):
    authentication_classes=()
    permission_classes=()

    def post(self, request, *args, **kwargs):

        try:
            from_iban,from_account_obj = check_account_object(request.data.get("from_iban"),True)
            to_iban,to_account_obj = check_account_object(request.data.get("to_iban"),True)
            if from_iban ==to_iban:
                raise Exception("Both accounts is same")
            balance = request.data.get("balance")
            create_transaction(from_account_obj,balance,False,True)
            create_transaction(to_account_obj,balance,True,False)
            return Response({"message":"Amount is transfer successfully"},status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"errors":str(e)},status.HTTP_400_BAD_REQUEST)
        
