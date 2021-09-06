import monster from "../../assets/monster.svg";
import './NoMatch.style.css';

const NoMatch = ({ isNoData }) => (
    <div className="no-results">
        <img src={monster} alt="icon" />
        {isNoData ? (
            <>
                <span className="no-match">No Results Found!</span>
                <span className="suggestion">Try adding Friends</span></>
        ) : (
            <>
                <span className="no-match">No match found!</span>
                <span className="suggestion">Please check the spelling</span>
            </>
        )
        }
    </div>
)

export default NoMatch;