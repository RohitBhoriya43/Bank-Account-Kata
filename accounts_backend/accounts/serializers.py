from rest_framework import serializers
from .models import *

class TransactionSerializer(serializers.ModelSerializer):
    # date = serializers.SerializerMethodField(read_only=True)
    # # account_number = serializers.SerializerMethodField(read_only=True)

    # def get_date(self,obj):
    #     return obj.date.date()
    


    # def get_account_number(self,obj):
    #     return obj.account.iban
    
    class Meta:

        model = Transaction
        fields = ("id","account","amount","balance","date")

class AccountSerializer(serializers.ModelSerializer):
    # date = serializers.SerializerMethodField(read_only=True)


    # def get_date(self,obj):
    #     return obj.date.date()
    
    class Meta:

        model = Account
        fields = "__all__"
    