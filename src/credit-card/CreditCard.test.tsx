import App from '../App';
import CreditCard from './CreditCard';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('CreditCard Component', () => {
    const mockSubmit = vi.fn((formState) => {});

    const renderComponent = () => {
        render(<CreditCard onSubmit={mockSubmit} />);
    };

    it('renders the credit card form', () => {
        renderComponent();

        expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/card name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
        expect(screen.getByTestId('expiration-month-select')).toBeInTheDocument();
        expect(screen.getByTestId('expiration-year-select')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('allows entering data into input fields', async () => {
        renderComponent();

        const cardNumberInput: HTMLInputElement = screen.getByLabelText(/card number/i);
        await userEvent.type(cardNumberInput, '1234567890123456');
        expect(cardNumberInput.value).toBe('1234567890123456');

        const cardNameInput: HTMLInputElement = screen.getByLabelText(/card name/i);
        await userEvent.type(cardNameInput, 'John Doe');
        expect(cardNameInput.value).toBe('John Doe');

        const cvvInput: HTMLInputElement = screen.getByLabelText(/cvv/i);
        await userEvent.type(cvvInput, '123');
        expect(cvvInput.value).toBe('123');

        const expirationMonthSelect: HTMLSelectElement = screen.getByTestId('expiration-month-select');
        await userEvent.selectOptions(expirationMonthSelect, '2');
        expect(expirationMonthSelect.value).toBe('2');

        const expirationYearSelect: HTMLSelectElement = screen.getByTestId('expiration-year-select');
        const currentYear = new Date().getFullYear().toString();
        await userEvent.selectOptions(expirationYearSelect, currentYear);
        expect(expirationYearSelect.value).toBe(currentYear);
    });

    it('validates form fields on submit', async () => {
        renderComponent();

        await userEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('submits the form with valid data', async () => {
        renderComponent();

        await userEvent.type(screen.getByLabelText(/card number/i), '1234567890123456');
        await userEvent.type(screen.getByLabelText(/card name/i), 'John Doe');
        await userEvent.type(screen.getByLabelText(/cvv/i), '123');

        await userEvent.selectOptions(
            screen.getByTestId('expiration-year-select'),
            new Date().getFullYear().toString(),
        );

        await userEvent.selectOptions(screen.getByTestId('expiration-month-select'), '2');

        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(mockSubmit).toHaveBeenCalledWith({
            cardNumber: '1234567890123456',
            cardHolder: 'John Doe',
            expirationMonth: '2',
            expirationYear: new Date().getFullYear().toString(),
            cvv: '123',
        });
    });
});
