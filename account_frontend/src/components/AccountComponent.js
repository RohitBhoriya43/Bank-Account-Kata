// src/components/AccountComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionComponent from './TransactionComponent'

const AccountComponent = ({baseUrl}) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState('');
    const [iban, setIban] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortItem, setSortItem] = useState('-date');
    const [filters, setFilters] = useState({
        page_size:10,sort_order:"-date"
    });

    useEffect(() => {
        localStorage.setItem("currentPage",1)
        fetchAccounts();
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            console.log("selectedAccount",selectedAccount)
            fetchTransactions();
        }
    }, [selectedAccount, page, sortOrder, filters]);

    const fetchAccounts = async () => {

        const response = await axios.get(`${baseUrl}/accounts/get`);
        setAccounts(response.data);
    };

    const fetchTransactions = async () => {
        try{
            const params = new URLSearchParams()
            if (page) params.append("page_no",page)
            if (filters.page_size) params.append("page_size",filters.page_size)
            if (filters.sort_order) params.append("sort_order",filters.sort_order)
            if (filters.date_from) params.append("date_from",filters.date_from)
            if (filters.date_to) params.append("date_from",filters.date_to)
            if (filters.transaction_type) params.append("transaction_type",filters.transaction_type)

            console.log("Filter string transaction",params.toString())
            const res = await axios.get(`${baseUrl}/transaction/${selectedAccount}/statement?${params.toString()}`);
            console.log("Fetch Transaction res",res)
            setTransactions(res.data.data);
            setTotalPage(res.data.total_pages)

        }
        catch(err){
            console.log("deposit error",err)
            // alert(err.response.data.errors)
        }
    };

    const handleDeposit = async () => {
        try{
            const res= await axios.post(`${baseUrl}/deposit/transaction`, {balance: Number(amount),iban:selectedAccount });
            console.log("deposit res",res)
            alert("The Amount has been deposit successfully")
            fetchAccounts();
            fetchTransactions()

        }
        catch(err){
            console.log("deposit error",err)
            alert(err.response.data.errors)
        }
    };

    const handleWithdraw = async () => {
        try{
        const res = await axios.post(`${baseUrl}/withdraw/transaction`, {balance: Number(amount),iban:selectedAccount });
        console.log("withdraw res",res)
        fetchAccounts();
        fetchTransactions()
        alert("The Amount has been withdrawn successfully")
        }catch(err){
            console.log("withdraw error",err)
            alert(err.response.data.errors)
        }
    };

    const handleTransfer = async () => {
        try{
            const res = await axios.post(`${baseUrl}/transfer/transaction`, { from_iban:selectedAccount,to_iban: iban, balance: Number(amount) });
            console.log("transfer res",res)
            alert("The Amount has been transfer successfully")
            fetchAccounts();
            fetchTransactions()
        }catch(err){
            console.log("transfer error",err)
            alert(err.response.data.errors)
        }
    };

    const handleSortOrderChange = (event) => {
        const sortValue = event.target.value
        const sortItems = sortValue==="asc"?"date":"-date"
        setSortOrder(sortValue);
        setSortItem(sortItems)
        
    };

    const handleFilterChange = (event) => {
        console.log("filter event ",event)
        setFilters({
            ...filters,
            page_size:10,
            sort_order:sortItem,
            [event.target.name]: event.target.value,
        });
    };

    const handlePageChange = () => {
        // console.log("newPage",newPage)
        setPage(localStorage.getItem("currentPage"));
        
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Accounts</h1>
            <select 
                onChange={(e) => setSelectedAccount(e.target.value)} 
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="">Select Account</option>
                {accounts.map((account) => (
                    <option key={account.id} value={account.iban}>
                        {account.full_name} - {account.iban} - {account.balance}
                    </option>
                ))}
            </select>
            <div className="mb-4">
                <input 
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Amount" 
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button 
                    onClick={handleDeposit} 
                    className="p-2 bg-green-500 text-white rounded mr-2"
                >
                    Deposit
                </button>
                <button 
                    onClick={handleWithdraw} 
                    className="p-2 bg-red-500 text-white rounded"
                >
                    Withdraw
                </button>
            </div>
            <div className="mb-4">
                <input 
                    type="text" 
                    value={iban} 
                    onChange={(e) => setIban(e.target.value)} 
                    placeholder="IBAN" 
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button 
                    onClick={handleTransfer} 
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    Transfer
                </button>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Sort Order:</label>
                <select 
                    value={sortOrder} 
                    onChange={handleSortOrderChange} 
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date From:</label>
                <input 
                    type="date" 
                    name="date_from" 
                    onChange={handleFilterChange} 
                    className="p-2 border border-gray-300 rounded"
                />
                <label className="block mb-2">Date To:</label>
                <input 
                    type="date" 
                    name="date_to" 
                    onChange={handleFilterChange} 
                    className="p-2 border border-gray-300 rounded"
                />
                <label className="block mb-2">Transaction Type:</label>
                <select 
                    name="transaction_type" 
                    onChange={handleFilterChange} 
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="All">All</option>
                    <option value="deposit">Deposits</option>
                    <option value="withdrawal">Withdrawals</option>
                </select>
            </div>
            {selectedAccount && (
                <TransactionComponent
                    transactions={transactions}
                    onPageChange={handlePageChange}
                    totalPage ={totalPage}
                />
            )}
        </div>
    );
};

export default AccountComponent;
