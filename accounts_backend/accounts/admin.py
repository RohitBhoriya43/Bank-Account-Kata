from django.contrib import admin, messages
from django.core.exceptions import ValidationError
from accounts.models import *



@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id',"full_name","iban","balance")
    
    

    def save_model(self, request, obj, form, change):
        try: 
            if Account.objects.filter(iban=obj.iban).exists():
                while True:
                    iban = generate_account_no()
                    print("iban",iban)
                    if not Account.objects.filter(iban=iban).exists():
                        obj.iban = iban
                        break    
            super().save_model(request, obj, form, change)
        except ValidationError as e:
            messages.set_level(request, messages.ERROR)
            for message in e.messages:
                messages.error(request, message)

# @admin.register(Transaction)
# class StaffAdmin(admin.ModelAdmin):
#     list_display = ('employee',)

#     def save_model(self, request, obj, form, change):
#         try:
#             if obj.employee.role != 'staff':
#                 raise ValidationError("Only users with the 'staff' role can be added as staff members.")
#             if StaffRoster.objects.filter(employee__id = obj.employee.id).exists():
#                 raise ValidationError("This employee id or username is already exists")
#             super().save_model(request, obj, form, change)
#         except ValidationError as e:
#             messages.set_level(request, messages.ERROR)
#             for message in e.messages:
#                 messages.error(request, message)


