from django.db import models
from django.utils import timezone
from datetime import datetime,timedelta
import random
# import pytz

def current_date_and_time():

    return datetime.now()

def generate_account_no():
    return f"IBAN770010{str(random.randint(100000,999999))}"

class Account(models.Model):
    iban = models.CharField(max_length=34,unique=True,editable=False,blank=True)
    full_name = models.CharField(max_length=200,null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2,default=0)

    def save(self,*args,**kwargs):
        if not self.iban:
            self.iban = self.generate_unique_iban()
        super().save(*args, **kwargs)
    
    def generate_unique_iban(self):
        while True:
            iban = f"IBAN770010{str(random.randint(100000,999999))}"
            if not Account.objects.filter(iban=iban).exists():
                break
        return iban


class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    amount = models.CharField(max_length=100,null=True,blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
