import monster from "../../assets/monster.svg";
import './NoMatch.style.css';

const NoMatch = () => (
    <div className="no-results">
        <img src={monster} alt="icon" />
        <span className="no-match">No match found!</span>
        <span className="suggestion">Please check the spelling</span>
    </div>
)

export default NoMatch;