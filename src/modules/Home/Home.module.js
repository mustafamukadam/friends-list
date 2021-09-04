import { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getFriendsData } from "../../api/friendsApi";
import Home from './Home';


const HomeModule = () => {

    const [initialized, setInitialized] = useState(false);
    const [state, setState] = useState([])

    async function loadFriendsData() {
        const data = await getFriendsData();
        setState(data);
        setInitialized(true);
    }

    useEffect(() => {
        loadFriendsData();
    }, [])

    return initialized ? (
        <AppContext.Provider value={state}>
            <Home />
        </AppContext.Provider>
    ) : null;
}

export default HomeModule;