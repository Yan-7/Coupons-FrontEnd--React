import "./Loading.css";
import loadingImage from "../../../Assets/images/200w.gif";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
			<img src={loadingImage} />
        </div>
    );
}

export default Loading;
