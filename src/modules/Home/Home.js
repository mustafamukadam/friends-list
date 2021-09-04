import { useState, useMemo, useContext } from 'react';
import Icon from "../../theme/Icons";
import FriendCard from "../../components/FriendCard/FriendCard";
import Pagination from "../../components/Pagination/Pagination";
import { AppContext } from "../../context/AppContext";
import { useFormValidation } from "../../hooks/validations.hook";

function Home() {
  console.log('render')

  // CONSTANTS
  const LIMIT = 4;

  // Context
  const appContextState = useContext(AppContext);

  // STATE
  const [data, setData] = useState(appContextState);
  const [fullName, setFullName] = useState('');
  const [newFriend, setNewFriend] = useState('');
  const [offset, setOffSet] = useState(0);
  const [isSortFavourite, setIsSortFavourite] = useState(false);
  const [errors, setErrors, validateForm] = useFormValidation();

  // Methods
  function updateOffset(index) {
    setOffSet(index);
  }

  function filterNames(e) {
    let name = e.target.value;
    setFullName(name);
    setOffSet(0);
  }

  function toggleFavourite(id) {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isFavourite: !item.isFavourite
        }
      }
      else
        return item
    })
    setData(updatedData)
    isSortFavourite && setOffSet(0)
  }

  function addNewFriend() {
    if (!validateForm(newFriend)) return;

    const friend = {
      id: data.length + 2,
      name: newFriend,
      imgSrc: `https://avatars.dicebear.com/api/avataaars/${data.length + 2}.svg`,
      isFavourite: false
    }
    const newData = [friend, ...data];
    setData(newData)
    setNewFriend('')
    setErrors({})
  }

  function deleteFriend(id) {
    if (window.confirm('are you sure you want to delete this friend?')) {
      const updatedData = data.filter((item) => item.id !== id)
      setData(updatedData)
    }
  }

  // DERIVED STATES
  const sortedList = useMemo(() =>
    isSortFavourite ? [...data].sort(function (x, y) { return y.isFavourite - x.isFavourite }) : data,
    [data, isSortFavourite]
  );

  const filteredList = useMemo(() =>
    fullName ? sortedList.filter(friend => friend.name.toLowerCase().includes(fullName.toLowerCase())) : sortedList,
    [fullName, sortedList]
  );

  const paginatedList = useMemo(() =>
    filteredList.slice(LIMIT * offset, LIMIT * (offset + 1)),
    [filteredList, LIMIT, offset]
  );

  return (
    <>
      <h1 className="title underline">Friends List 👬</h1>
      <div className="container">
        <header className="form-group">
          <input type="text"
            id="addFriend"
            placeholder="🤪 Add Friend"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addNewFriend() }}
          />
          {errors.name && <div className="error">{errors.name}</div>}
          {errors.alphabets && <div className="error">{errors.alphabets}</div>}
          <div className="btn" onClick={addNewFriend}>Add</div>
        </header>
        <header className="form-group">
          <input type="text" id="filter" placeholder="🔎 Search Friend ..." onChange={filterNames} value={fullName} />
          <div className="sort">
            <span>Sort</span>
            <div onClick={() => { setOffSet(0); setIsSortFavourite(!isSortFavourite) }}><Icon icon={isSortFavourite ? 'heartFillWhite' : 'heartWhite'} /></div>
          </div>
        </header>

        <ul id="result" className="friend-list">
          {
            paginatedList.map(friend =>
              <FriendCard friend={friend} toggleFavourite={toggleFavourite} deleteFriend={deleteFriend} key={friend.id} />
            )
          }
        </ul>
        <Pagination offset={offset} list={filteredList} updateOffset={updateOffset} />
      </div>
    </>
  );
}

export default Home;
