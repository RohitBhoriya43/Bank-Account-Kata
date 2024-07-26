// src/App.js
import React, { useState } from 'react';
import AccountComponent from './components/AccountComponent';
import TransactionComponent from './components/TransactionComponent';

const App = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const baseUrl = "http://localhost:8000/api/v1/account"

    return (
        <div className="container mx-auto p-4">
            <AccountComponent setSelectedAccount={setSelectedAccount} baseUrl = {baseUrl} />
            {selectedAccount && <TransactionComponent accountId={selectedAccount} baseUrl = {baseUrl} />}
        </div>
    );
};

export default App;
