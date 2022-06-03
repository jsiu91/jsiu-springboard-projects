const store = Redux.createStore(emojiReducer);

const happyButton = document.querySelector('#happy');
const sadButton = document.querySelector('#sad');
const angryButton = document.querySelector('#angry');
const confusedButton = document.querySelector('#confused');
const displayEmoji = document.querySelector('#display');

happyButton.addEventListener('click', () => {
    store.dispatch({type: "HAPPY", emoji: "^ㅂ^"});
});
sadButton.addEventListener('click', () => {
    store.dispatch({type: "SAD", emoji: "T.T"});
});
angryButton.addEventListener('click', () => {
    store.dispatch({type: "ANGRY", emoji: "ಠ╭╮ಠ"});
});
confusedButton.addEventListener('click', () => {
    store.dispatch({type: "CONFUSED", emoji: "(@_@)"});
});

function renderEmoji(){
    const emoji = store.getState().emoji;
    displayEmoji.innerText = emoji
}

renderEmoji();
store.subscribe(renderEmoji);