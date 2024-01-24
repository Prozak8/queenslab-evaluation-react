import './CreditCard.css';

type CreditCardProps = {
    cardNumber: string;
    cardHolder: string;
};
const months = ['Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

// TODO: Dynamic years
const years = ['Year', '2019', '2020', '2021', '2022', '2023', '2024'];

const CreditCard = ({ cardNumber, cardHolder }: CreditCardProps) => {
    return (
        <div className='card'>
            <form action='' className='card__form'>
                <div className='input-group mb-2'>
                    <label className='input-label' htmlFor='cardNumber'>
                        Card Number
                    </label>
                    <input type='number' name='cardNumber' id='cardNumber' />
                </div>
                <div className='input-group mb-2'>
                    <label className='input-label' htmlFor='cardHolder'>
                        Card Name
                    </label>
                    <input type='text' name='cardHolder' id='cardHolder' />
                </div>
                <div className='row gap-2 mb-4'>
                    <div className='input-group col-8 row wrap expiration-group'>
                        <label className='input-label w-100' htmlFor='expirationMonth'>
                            Expiration Date
                        </label>
                        <div className='expiration-select'>
                            <select name='expirationMonth' id='expirationMonth'>
                                {months.map((val) => (
                                    <option value={val} key={`exp-month-${val}`}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                            <select name='expirationYear' id='expirationYear'>
                                {years.map((val) => (
                                    <option value={val} key={`exp-year-${val}`}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='input-group col-4'>
                        <label className='input-label' htmlFor='CVV'>
                            CVV
                        </label>
                        <input type='text' name='CVV' id='CVV' />
                    </div>
                </div>
                <button className='button-submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreditCard;
