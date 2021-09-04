import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://demo0326912.mockable.io/friends"

export function getFriendsData() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}