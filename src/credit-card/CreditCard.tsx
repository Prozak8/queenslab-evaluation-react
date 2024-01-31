import { ChangeEvent, useCallback, useState } from 'react';
import './CreditCard.css';
import CreditCardVisual from './CreditCardVisual';

type CreditCardProps = {
    onSubmit: (formData: IFormState) => void;
};

export type IFormState = {
    cardNumber: string;
    cardHolder: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
};

const CreditCard = ({ onSubmit }: CreditCardProps) => {
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

        const newErrors = Object.entries(formState).reduce((errors: Partial<IFormState>, [key, value]) => {
            const error = validateField(key, value);
            if (error) {
                errors[key as keyof IFormState] = error;
            }
            return errors;
        }, {});

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formState);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (formErrors[name as keyof IFormState]) {
            validateField(name, value);
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateField = useCallback((name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'cardNumber':
                if (!value) {
                    error = 'Card number is required';
                } else if (!/^\d{16}$/.test(value)) {
                    error = 'Card number must be 16 digits';
                }
                break;
            case 'cardHolder':
                if (!value) {
                    error = 'Card name is required';
                } else if (/\d/.test(value)) {
                    error = 'Card holder name should not contain numbers';
                }
                break;
            case 'expirationMonth':
                if (!value) {
                    error = 'Please select a month';
                }
                break;
            case 'expirationYear':
                if (!value) {
                    error = 'Please select a year';
                }
                break;
            case 'cvv':
                if (!value) {
                    error = 'CVV is required';
                } else if (!/^\d{3}$/.test(value)) {
                    error = 'CVV must be 3 digits';
                }
                break;
            default:
                break;
        }
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));

        return error;
    }, []);

    return (
        <div className='card'>
            <CreditCardVisual className='credit-card-visual' formState={formState} />
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
                    {formErrors.cardNumber && <span className='input-error'>{formErrors.cardNumber}</span>}
                </div>
                <div className='input-group mb-2'>
                    <label className='input-label' htmlFor='cardHolder'>
                        Card Name
                    </label>
                    <input
                        type='text'
                        name='cardHolder'
                        id='cardHolder'
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    {formErrors.cardHolder && <span className='input-error'>{formErrors.cardHolder}</span>}
                </div>
                <div className='row gap-2 mb-4'>
                    <div className='col-8 row wrap expiration-group'>
                        <label className='input-label w-100' htmlFor='expirationMonth'>
                            Expiration Date
                        </label>
                        <div className='expiration-select'>
                            <div className='input-group w-100 relative'>
                                <select
                                    name='expirationMonth'
                                    id='expirationMonth'
                                    className='w-100'
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    data-testid='expiration-month-select'
                                >
                                    <option value=''>Month</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={`exp-month-${i}`} value={i + 1}>
                                            {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.expirationMonth && (
                                    <span className='input-error'>{formErrors.expirationMonth}</span>
                                )}
                            </div>
                            <div className='input-group w-100 relative'>
                                <select
                                    name='expirationYear'
                                    id='expirationYear'
                                    className='w-100'
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    data-testid='expiration-year-select'
                                >
                                    <option value=''>Year</option>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <option key={`exp-year-${i}`} value={new Date().getFullYear() + i}>
                                            {new Date().getFullYear() + i}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.expirationYear && (
                                    <span className='input-error'>{formErrors.expirationYear}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='input-group col-4'>
                        <label className='input-label' htmlFor='cvv'>
                            CVV
                        </label>
                        <input
                            type='number'
                            name='cvv'
                            id='cvv'
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                        {formErrors.cvv && <span className='input-error'>{formErrors.cvv}</span>}
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
