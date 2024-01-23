import './CreditCard.css';

type CreditCardProps = {
    cardNumber: string;
    cardHolder: string;
};

const CreditCard = ({ cardNumber, cardHolder }: CreditCardProps) => {
    return (
        <div className='card'>
            <form action='' className='card__form'>
                <div className='input-group'>
                    <label htmlFor='cardNumber'>Card Number</label>
                    <input type='text' name='cardNumber' id='cardNumber' />
                </div>
                <div className='input-group'>
                    <label htmlFor='cardHolder'>Card Name</label>
                    <input type='text' name='cardHolder' id='cardHolder' />
                </div>
                <div className='row'>
                    <div className='input-group col-8 row wrap'>
                        <label htmlFor='expirationMonth'>Expiration Date</label>
                        <select name='expirationMonth' id='expirationMonth'></select>
                        <select name='expirationYear' id='expirationYear'></select>
                    </div>
                    <div className='input-group col-4'>
                        <label htmlFor='CVV'>CVV</label>
                        <input type='text' name='CVV' id='CVV' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreditCard;
