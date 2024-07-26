from .imports import *
from datetime import datetime
from django.utils import timezone

class TransactionFilter(APIView):
    authentication_classes=()
    permission_classes=()

    def get(self, request, *args, **kwargs):

        try:
            account_number  = kwargs.get("account_id")
            page_no = request.query_params.get("page_no",1)
            page_size = request.query_params.get("page_size",10)
            sort_order = request.query_params.get("sort_order","-date")
            

            data_filter = self.filter_data(account_number,request.query_params)
            print("data_filter",data_filter)
            print("timezone get",timezone.get_current_timezone())
            transaction_obj = Transaction.objects.select_related("account").filter(**data_filter).order_by(sort_order)
            paginator = Paginator(transaction_obj,int(page_size))
            transaction_obj_page = paginator.get_page(int(page_no))
            tranaction_serializer = TransactionSerializer(transaction_obj_page,many=True)
            data = {
                "total_pages":paginator.num_pages,
                "current_page":transaction_obj_page.number,
                "data":tranaction_serializer.data
            }
            return Response(data,status.HTTP_200_OK)
        except Exception as e:
            return Response({"errors":str(e)},status.HTTP_400_BAD_REQUEST)
        
    def filter_data(self,account_number,query):
        date_from = self.convert_date(query.get("date_from",None))
        date_to = self.convert_date(query.get("date_to",None))
        print("date_from",date_from)
        transaction_type = query.get("transaction_type","All")
        data = {"account__iban":account_number}
        if date_from and not date_to:
            data.update({"date__gte":date_from})
        elif date_to and not date_from:
            data.update({"date__lte":date_to})
        elif date_to and date_from:
            data.update({"date__gte":date_from,"date__lte":date_to})
        
        if transaction_type == "deposit":
            data.update({"amount__startswith":"+"})
        elif transaction_type == "withdrawal":
            data.update({"amount__startswith":"-"})
        
        return data

    def convert_date(self,dt):
        if dt is None or dt == "":
            return dt
        try:
            # date = datetime.strptime(dt,"%Y-%m-%d")
            # print("date",date)
            date = str(datetime.strptime(dt,"%Y-%m-%d"))
            replace_date= date.replace(" ","T")
            print("replace_date",replace_date)

            datetime_str = f"{replace_date}.000000+05:30"
            # timezone_date = datetime.fromisoformat(datetime_str)
            # print("date",timezone_date)
            # return date
            return datetime_str
            # return date
        except Exception as e:
            raise Exception("date format must be (YYYY-MM-DD)")

    



