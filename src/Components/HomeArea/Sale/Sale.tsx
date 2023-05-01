import "./Sale.css";

interface SaleProps {
    category: string;
    percent: number;
    comments?: string; // optional
}

function Sale(props: SaleProps): JSX.Element {
    return (
        <div className="Sale Box">
            <span>💲💲💲 {props.percent}% discount on all {props.category}
                {props.comments && (<> | {props.comments}</>)}</span>
        </div>
    );
}

export default Sale;
