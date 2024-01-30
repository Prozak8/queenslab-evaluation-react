import { useMemo } from 'react';
import { IFormState } from './CreditCard';
import './CreditCardVisual.css';

type CreditCard = { name: 'visa'; numberLength: number; parts: number[] };
type CreditCardVisualProps = React.HTMLProps<HTMLDivElement> & { formState: IFormState };

// Move the credit card configuration outside the component if it's constant
// or consider passing it as a prop if it's dynamic
const cardConfig = {
    visa: {
        numberLength: 16,
        parts: [4, 4, 4, 4],
    },
    // Add other card types as needed
};

const getDefaultValue = (numberLength: number) => '#'.repeat(numberLength).split('');

// A custom hook or utility function to split the card number
const useSplitCardNumber = (cardNumber: string, cardType: 'visa') => {
    const card = cardConfig[cardType];

    return useMemo(() => {
        const cardNumberChars = cardNumber.split('');
        const visualChars = getDefaultValue(card.numberLength).map((char, i) => cardNumberChars[i] || char);

        const value: Array<string[]> = [];
        card.parts.reduce((prev, acc) => {
            value.push(visualChars.slice(prev, prev + acc));
            return prev + acc;
        }, 0);

        return value;
    }, [cardNumber, card]);
};

const formattedExpirationMonth = (month: string) => (month.length > 1 ? month : `0${month}`);

const CreditCardVisual = ({ className, formState }: CreditCardVisualProps) => {
    const { cardNumber, cardHolder, expirationMonth, expirationYear, cvv } = formState;

    const splitCardNumber = useSplitCardNumber(cardNumber, 'visa'); // Assuming 'visa' as a default card type

    return (
        <div className={`card-visual ${className}`}>
            <div>
                <div className='card-visual__sticker'></div>
                <div className='card-visual__type'></div>
            </div>
            <div className='card-visual__number'>
                {splitCardNumber.map((part, i) => (
                    <div key={`part-${i}`} className='card-visual__number__part'>
                        {part.map((char, j) => (
                            <span className='card-visual__number__part__char' key={`part-char-${j}`}>
                                {char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <div className='card-visual__card-holder'>
                    <span>Card Holder</span>
                    {/* Use a non blank space to preserve height */}
                    <span>{cardHolder || `\u00A0`}</span>
                </div>
                <div className='card-visual__expiry'>
                    <span>Expiry</span>
                    <span>{`${(expirationMonth && formattedExpirationMonth(expirationMonth)) || 'MM'}/${
                        expirationYear.slice(2, 4) || 'YY'
                    }`}</span>
                </div>
            </div>
        </div>
    );
};

export default CreditCardVisual;
