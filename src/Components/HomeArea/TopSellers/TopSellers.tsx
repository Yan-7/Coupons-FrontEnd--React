import "./TopSellers.css";

function TopSellers(): JSX.Element {

    const TopSellers = [
        {id:1, name: "usb cable"},
        {id:2, name: "gamer mouse"},
        {id:3, name: "xiaomi robot"}
        
    ]

    return (
        <div className="TopSellers Box">
            <span>Top sellers: </span>
            {TopSellers.map((d)=> (
                <span key={d.id}>{d.name} | </span>
            ))}
        </div>
    );
}

export default TopSellers;
