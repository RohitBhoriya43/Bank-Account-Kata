// src/components/TransactionComponent.js
import React from 'react';

const TransactionComponent = ({ transactions, onPageChange, totalPage }) => {
    const currentPage = localStorage.getItem("currentPage")

    console.log("currentPage",currentPage,"totalPage",totalPage)


    const handleNextPage = () => {
        console.log("currentPage",currentPage)
        if (currentPage<totalPage && currentPage >0){
            localStorage.setItem("currentPage",currentPage+1)
            onPageChange();
        }else{
            console.log("Next button is disabled")
            alert("Current page and Next page is same page")
        }
        
    };

    const handlePreviousPage = () => {
        if (currentPage!==1 && currentPage >1){
            localStorage.setItem("currentPage",currentPage-1)
            onPageChange();
        }else{
            console.log("Previous button is disabled")
            alert("Current page and Previous page is same page")
        }

        
    };

    const handleFirstPage = () => {
        if (currentPage!==1 && currentPage >1){
            localStorage.setItem("currentPage",1)
            onPageChange();
        }else{
            console.log("First button is disabled")
            alert("Current page and First page is same page")
        }

        
    };

    const handleLastPage = (lastPage) => {
        if (currentPage!==totalPage && currentPage >1){
            localStorage.setItem("currentPage",lastPage)
            onPageChange();
        }else{
            console.log("Last button is disabled")
            alert("Current page and Last page is same page")
        }
       
    };

    return (
        <div className="mt-4">
            <h1 className="text-xl font-bold mb-2">Transactions</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="py-2 px-4 border-b">{transaction.date}</td>
                            <td className="py-2 px-4 border-b">{transaction.amount}</td>
                            <td className="py-2 px-4 border-b">{transaction.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button 
                    onClick={handleFirstPage} 
                    className="p-2 bg-gray-300 rounded"
                    // disabled={(currentPage!==1 && currentPage >1)?false:true}
                >
                    First
                </button>
                <button 
                    onClick={handlePreviousPage} 
                    // disabled={(currentPage!==1 && currentPage >1)?false:true} 
                    className="p-2 bg-gray-300 rounded"
                >
                    Previous
                </button>
                <button 
                    onClick={handleNextPage} 
                    className="p-2 bg-gray-300 rounded"
                    // disabled={(currentPage<totalPage && currentPage >0)? false:true}
                >
                    Next
                </button>
                <button 
                    onClick={() => handleLastPage(totalPage)} 
                    className="p-2 bg-gray-300 rounded"
                    // disabled={(currentPage!==totalPage && currentPage >1)?true:false}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default TransactionComponent;
