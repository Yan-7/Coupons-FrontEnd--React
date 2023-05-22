// import appConfig from "../../../Utils/Config";

import Sale from "../Sale/Sale";
import SpecialDeal from "../SpecialDeal/SpecialDeal";
import TopSellers from "../TopSellers/TopSellers";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            
            <TopSellers/>
            
            <Sale category="Electronics" percent={10} comments="Only for purchase above $100" />
            
            <SpecialDeal/>
            
        </div>
    );
}

export default Home;
