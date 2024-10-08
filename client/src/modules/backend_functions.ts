import { User } from "firebase/auth";
import { UserData } from "server/src/middleware/auth";
import { Chat } from "server/src/routers/chats";

function getStartingPoint()
{
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        return "http://localhost:8080"
    else 
        return "https://motivibe.live"
}

async function getProfile(user: User): Promise<UserData | null>
{
    const starting_point = getStartingPoint();

    const response = await fetch(`${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`)
    if (!response.ok)
    {
        return null
    }
    const json = await (response.json())
    console.log("profile", json)
    return json
}

async function setProfileBio(user: User, new_bio: string) {
    const starting_point = getStartingPoint();
    const url = `${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    await fetch(url, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
            "bio": new_bio
        })
    })
}

async function getTodo(user: User) {
    const starting_point = getStartingPoint();
    const url = `${starting_point}/profile/todo?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    await fetch(url, {
        method: "GET"
    })
}

async function updateTodo(user: User, data: UserData) {
    const starting_point = getStartingPoint();
    const url = `${starting_point}/profile/todo?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    await fetch(url, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(data.todo_list)
    })
}

async function setProfileSignupStatus(user: User, open: boolean) {
    const starting_point = getStartingPoint();
    const url = `${starting_point}/profile/me?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    await fetch(url, {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
            "open_to_wave": open
        })
    })
}

async function getChat(user: User, chat_id?: string): Promise<Chat | null>
{
    if (!chat_id || !user)
        return null

    const starting_point = getStartingPoint();
    const response = await fetch(`${starting_point}/chats/${chat_id}?id_token=${encodeURIComponent(await user.getIdToken(true))}`)
    if (!response.ok)
        return null

    const json = await (response.json())

    console.log("chat", json)

    return json
}

async function requestMatch(user: User)
{
    const starting_point = getStartingPoint();
    const url = `${starting_point}/matches/find?id_token=${encodeURIComponent(await user.getIdToken(true))}`
    const res = await fetch(url);
    return res.json();
}

export { getProfile, setProfileBio, getStartingPoint, getChat, setProfileSignupStatus, requestMatch, getTodo, updateTodo }
