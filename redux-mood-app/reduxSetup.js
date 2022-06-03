const initialState = {mood: "neutral", emoji: "ʕ•ᴥ•ʔ"}

function emojiReducer(state=initialState, action){
    switch (action.type){
        case "HAPPY":
            return {...state, mood: "happy", emoji: action.emoji};
        case "SAD":
            return {...state, mood: "sad", emoji: action.emoji};
        case "ANGRY":
            return {...state, mood: "angry", emoji: action.emoji};
        case "CONFUSED":
            return {...state, mood: "confused", emoji: action.emoji};
        default:
            return state;
    }
}
