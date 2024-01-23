import './CreditCard.css';

type CreditCardProps = {
    cardNumber: string;
    cardHolder: string;
};

const CreditCard = ({ cardNumber, cardHolder }: CreditCardProps) => {
    return <div className='card'>
      <form action="">
        <input type="text" name="cardNumber" id="cardNumber" />
        <input type="text" name="cardHolder" id="cardHolder" />
        <select name="expirationMonth" id="expirationMonth"></select>
        <select name="expirationYear" id="expirationYear"></select>
        <input type="text" name="CVV" id="CVV" />
      </form>
    </div>;
};

export default CreditCard;
