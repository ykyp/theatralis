import * as ga from "../lib/ga";
import {ISSERVER} from "../components/session-storage-state";
const LIKES_LS = 'th.likes';

export const addToLikes = (id) => {
    console.log("add to likes");
    try {
        if(!ISSERVER) {
            const item = localStorage.getItem(LIKES_LS);
            const items = item !== null ? JSON.parse(item) : [];
            if (!items.find(i => i === id)) {
                items.push(id);
                localStorage.setItem(LIKES_LS, JSON.stringify(items));
                window.dispatchEvent(new Event("storage"));
                ga.event({
                    action: "agenda-add",
                    params : {
                        event: id
                    }
                })
            }
            return items;
        }
        return [];
    } catch (error) {
        console.log(error);
        return defaultValue;
    }

};

export const removeFromLikes = (id) => {
    try {
        if(!ISSERVER) {
            const item = localStorage.getItem(LIKES_LS);
            const existingLikes = item !== null ? JSON.parse(item) : [];
            const newLikes = existingLikes.filter(l=> l !== id);
            localStorage.setItem(LIKES_LS, JSON.stringify(newLikes));
            window.dispatchEvent(new Event("storage"));
            ga.event({
                action: "agenda-remove",
                params : {
                    event: id
                }
            })
            return newLikes;
        }
        return [];
    } catch (error) {
        console.log(error);
        return defaultValue;
    }

};

export const isLiked = (id) => {
    try {
        if(!ISSERVER) {
            const item = localStorage.getItem(LIKES_LS);
            const existingLikes = item !== null ? JSON.parse(item) : [];
            console.log("is liked ", id, !!(existingLikes && existingLikes.find(l => l === id)))
            return !!(existingLikes && existingLikes.find(l => l === id));
        }
        return false;
    } catch (error) {
        console.log(error);
        return defaultValue;
    }

};