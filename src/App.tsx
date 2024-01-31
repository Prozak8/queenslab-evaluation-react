import './App.css';
import { useState } from 'react';
import CreditCard, { IFormState } from './credit-card/CreditCard';

const App = () => {
    const onSubmit = async (formData: IFormState) => {
        const response = await fetch('/api/payments', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        if (response.status === 404) {
            throw new Error('404: Not found.');
        } else if (response.status === 500) {
            throw new Error('500: Server error.');
        }

        const json = await response.json();

        console.log(json);
    };

    return (
        <div className='App'>
            <CreditCard onSubmit={onSubmit} />
        </div>
    );
};

export default App;
