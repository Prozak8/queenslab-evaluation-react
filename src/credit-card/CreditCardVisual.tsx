import './CreditCardVisual.css';

type CreditCardVisualProps = React.HTMLProps<HTMLDivElement> & {};

const CreditCardVisual = ({ className }: CreditCardVisualProps) => {
    return (
        <div className={`card-visual ${className}`}>
            <div>
                <div className='card-visual__sticker'></div>
                <div className='card-visual__type'></div>
            </div>
            <div className='card-visual__number'>123412341234</div>
            <div>
                <div className='card-visual__card-holder'>
                    <span>Card Holder</span>
                    <span>Zakary Howard</span>
                </div>
                <div className='card-visual__expiry'>
                    <span>Expiry</span>
                    <span>04/20</span>
                </div>
            </div>
        </div>
    );
};

export default CreditCardVisual;
