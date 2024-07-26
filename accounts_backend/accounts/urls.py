from django.urls import path

from accounts.view.deposit_balance import DepositBalance
from accounts.view.withdraw_balance import WithdrawBalance
from accounts.view.transfer_balance import TransferBalance
from accounts.view.transaction_filter import TransactionFilter
from accounts.view.create_account import CreateAccount

urlpatterns = [
    path('accounts/get', CreateAccount.as_view(),name="get all account"),
    path('deposit/transaction', DepositBalance.as_view(),name="deposit amount"),
    path('withdraw/transaction', WithdrawBalance.as_view(),name="withdraw amount"),
    path('transfer/transaction', TransferBalance.as_view(),name="transfer amount"),
    path('transaction/<account_id>/statement', TransactionFilter.as_view(),name="transaction filter"),
]
