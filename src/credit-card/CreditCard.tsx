import { ChangeEvent, useState } from 'react';
import './CreditCard.css';
import CreditCardVisual from './CreditCardVisual';

type CreditCardProps = {
    cardNumber: string;
    cardHolder: string;
};

interface IFormState {
    cardNumber: string;
    cardHolder: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
}

const CreditCard = ({ cardNumber, cardHolder }: CreditCardProps) => {
    const [formState, setFormState] = useState<IFormState>({
        cardNumber: '',
        cardHolder: '',
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
    });

    const [formErrors, setFormErrors] = useState<Partial<IFormState>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formState);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);

        setFormState({
            ...formState,
            [name]: value,
        });

        if (formErrors[name as keyof IFormState]) {
            validateField(name, value);
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'cardNumber':
                if (value.length !== 16) {
                    setFormErrors({
                        ...formErrors,
                        cardNumber: 'Card number must be between 16 digits long',
                    });
                } else {
                    const { cardNumber, ...rest } = formErrors;
                    setFormErrors(rest);
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className='card'>
            <CreditCardVisual className='credit-card-visual' />
            <form onSubmit={handleSubmit} className='card__form'>
                <div className='input-group mb-2'>
                    <label className='input-label' htmlFor='cardNumber'>
                        Card Number
                    </label>
                    <input
                        type='number'
                        name='cardNumber'
                        id='cardNumber'
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    {formErrors.cardNumber && <span className='form-error'>{formErrors.cardNumber}</span>}
                </div>
                <div className='input-group mb-2'>
                    <label className='input-label' htmlFor='cardHolder'>
                        Card Name
                    </label>
                    <input type='text' name='cardHolder' id='cardHolder' onChange={handleInputChange} />
                </div>
                <div className='row gap-2 mb-4'>
                    <div className='input-group col-8 row wrap expiration-group'>
                        <label className='input-label w-100' htmlFor='expirationMonth'>
                            Expiration Date
                        </label>
                        <div className='expiration-select'>
                            <select name='expirationMonth' id='expirationMonth' onChange={handleInputChange}>
                                <option value=''>Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={`exp-month-${i}`} value={i + 1}>
                                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                    </option>
                                ))}
                            </select>
                            <select name='expirationYear' id='expirationYear' onChange={handleInputChange}>
                                <option value=''>Year</option>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <option key={`exp-year-${i}`} value={new Date().getFullYear() + i}>
                                        {new Date().getFullYear() + i}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='input-group col-4'>
                        <label className='input-label' htmlFor='cvv'>
                            CVV
                        </label>
                        <input type='number' name='cvv' id='cvv' onChange={handleInputChange} />
                    </div>
                </div>
                <button type='submit' className='button-submit'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreditCard;
