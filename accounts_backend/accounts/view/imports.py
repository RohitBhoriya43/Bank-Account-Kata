from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.models import *
from accounts.serializers import *
from django.core.paginator import Paginator




def check_account_object(iban,account=None):
    if iban and len(iban) == 16:
        iban_obj = Account.objects.filter(iban=iban)
        if not iban_obj.exists():
            return iban,None
        elif account and iban_obj.exists():
            return iban,iban_obj.first()
        else:
            raise Exception("this account number is already exists")
    else:
        raise Exception("Invalid Iban format")


def create_transaction(account_obj,balance,deposit,withdraw):
    total_balance = account_obj.balance
    print("total_balance",total_balance)
    if withdraw and total_balance > balance:
        total_balance = total_balance - balance
        balance = f"-{str(balance)}"
    elif deposit:
        total_balance = total_balance + balance
        balance = f"+{str(balance)}"
    else:
        raise Exception("Insufficient balance")
    
    
    account_obj.balance = total_balance
    account_obj.save()
    transaction_obj = Transaction(account=account_obj,amount = balance,balance = total_balance)
    transaction_obj.save()



