import Icon from "../../theme/Icons";
import './FriendCard.style.css';

const FriendCard = ({ friend, toggleFavourite, deleteFriend }) => (
    <li key={friend.id}>
        <img src={friend.imgSrc} alt="test alt" />
        <div className="friend-info">
            <span className="h2 bold">{friend.name}</span>
            <p>is your friend</p>
        </div>
        <div className="fav center" >
            <div className="heart" onClick={() => toggleFavourite(friend.id)}><Icon icon={friend.isFavourite ? 'heartFill' : 'heart'} /></div>
            <div className="delete" onClick={() => deleteFriend(friend.id)}><Icon icon='trash' /></div>
        </div>
    </li>
)

export default FriendCard