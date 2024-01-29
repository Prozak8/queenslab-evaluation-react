import { useCallback, useMemo } from 'react';
import { IFormState } from './CreditCard';
import './CreditCardVisual.css';

type CreditCard = { name: 'visa'; numberLength: number; parts: number[] };
type CreditCardVisualProps = React.HTMLProps<HTMLDivElement> & { formState: IFormState };

const card: CreditCard = {
    name: 'visa',
    numberLength: 16,
    parts: [4, 4, 4, 4],
};

const defaultValue = '#'.repeat(card.numberLength).split('');

const CreditCardVisual = ({ className, formState }: CreditCardVisualProps) => {
    const { cardNumber, cardHolder, expirationMonth, expirationYear, cvv } = formState;

    const splitCardNumber = useMemo(() => {
        const cardNumberChars = cardNumber.split('');
        const visualChars = defaultValue.map((char, i) => cardNumberChars[i] || char);

        const value: Array<string[]> = [];

        card.parts.reduce((prev, acc) => {
            value.push(visualChars.slice(prev, acc + prev));
            return (prev += acc);
        }, 0);

        return value;
    }, [cardNumber]);

    return (
        <div className={`card-visual ${className}`}>
            <div>
                <div className='card-visual__sticker'></div>
                <div className='card-visual__type'></div>
            </div>
            <div className='card-visual__number'>
                {splitCardNumber.map((cardNumberPart, i) => {
                    return (
                        <span key={`part-${i}`} className='card-visual__number__part'>
                            {cardNumberPart.join('')}
                        </span>
                    );
                })}
            </div>
            <div>
                <div className='card-visual__card-holder'>
                    <span>Card Holder</span>
                    <span>{cardHolder}</span>
                </div>
                <div className='card-visual__expiry'>
                    <span>Expiry</span>
                    <span>
                        {expirationMonth}/{expirationYear}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CreditCardVisual;
