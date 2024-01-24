import './CreditCardVisual.css';

type CreditCardVisualProps = React.HTMLProps<HTMLDivElement> & {};

const CreditCardVisual = ({ className }: CreditCardVisualProps) => {
    return (
        <div className={`card-visual ${className}`}>
            <div>
                <div className='card-visual__sticker'></div>
                <div className='card-visual__type'></div>
            </div>
            <div className='card-visual__number'></div>
            <div>
                <div className='card-visual__card-holder'></div>
                <div className='card-visual__expiry'></div>
            </div>
        </div>
    );
};

export default CreditCardVisual;
