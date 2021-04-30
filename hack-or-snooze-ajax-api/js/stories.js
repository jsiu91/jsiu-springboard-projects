'use strict';

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart () {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();

	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup (story, showDeleteBtn = false) {
	// console.debug("generateStoryMarkup", story);
	const hostName = story.getHostName();
	return $(`
      <li id="${story.storyId}">
	  	${showDeleteBtn ? showTrash() : ''}
	  	${showStar(currentUser, story)}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function showStar (user, story) {
	const show = Boolean(currentUser);
	if (show) {
		const favStar = user.isFavorite(story);
		const starType = favStar ? 'fas' : 'far';

		return show ? `<span class="star"><i class="fa-star ${starType}"></i></span>` : '';
	} else {
		return '';
	}
}

function showTrash () {
	const show = Boolean(currentUser);
	if (show) {
		return show ? `<span class="trash-can"><i class ="fas fa-trash-alt"></i></span>` : '';
	}
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage () {
	// console.debug('putStoriesOnPage');

	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story);
		$allStoriesList.append($story);
	}

	$allStoriesList.show();
}

function putFavoriteStories () {
	// console.debug('putFavoriteStories');

	$favoriteStories.empty();

	// loop through all of our stories and generate HTML for
	if (currentUser.favorites.length === 0) {
		$favoriteStories.append('<h4>No Favorites Added!</h4>');
	}
	for (let story of currentUser.favorites) {
		const $story = generateStoryMarkup(story);
		$favoriteStories.append($story);
	}

	$favoriteStories.show();
}

function putOwnStories () {
	// console.debug('putOwnStories');

	$ownStories.empty();

	// loop through all of our stories and generate HTML for
	if (currentUser.ownStories.length === 0) {
		$ownStories.append('<h4>No Stories Added!</h4>');
	}
	for (let story of currentUser.ownStories) {
		const $story = generateStoryMarkup(story, true);
		$ownStories.append($story);
	}

	$ownStories.show();
}

/** Handle Submit form submission.*/
async function submitStory (evt) {
	// console.debug('submitStory', evt);
	evt.preventDefault();

	//grab the author, title, and url
	const author = $('#author').val();
	const title = $('#title').val();
	const url = $('#url').val();
	const username = currentUser.username;
	const storyData = { title, author, url, username };

	// send POST data through the addStory method
	const story = await storyList.addStory(currentUser, storyData);

	const $story = generateStoryMarkup(story);
	$allStoriesList.prepend($story);

	$submitForm.slideUp('slow');
	$submitForm.trigger('reset');
}
$submitForm.on('submit', submitStory);

/** Favorite an story, update API, and add or remove user's story to favorite*/
async function addRemoveFavoriteStory (evt) {
	// console.debug('addRemoveFavoriteStory');

	const $target = $(evt.target);
	const $closestLi = $target.closest('li');
	const storyID = $closestLi.attr('id');
	const $star = $target.closest('i')[0];
	const story = storyList.stories.find((s) => s.storyId === storyID);
	try {
		if ($star.className === 'fa-star far') {
			await currentUser.addFavorite(currentUser, story);
			$star.classList.remove('far');
			$star.classList.add('fas');
		} else if ($star.className === 'fa-star fas') {
			await currentUser.removeFavorite(currentUser, storyID);
			$star.classList.remove('fas');
			$star.classList.add('far');
		}
	} catch (e) {
		console.log(e);
	}
}

$allStoriesList.on('click', addRemoveFavoriteStory);
$favoriteStories.on('click', addRemoveFavoriteStory);
$ownStories.on('click', addRemoveFavoriteStory);

/** Delete an story, update API, and add or remove user's own story*/
async function removeOwnStory (evt) {
	// console.debug('removeOwnStory');

	const $target = $(evt.target);
	const $story = $target[0].parentElement.parentElement;
	const $trash = $target[0];

	if ($trash.className === 'fas fa-trash-alt') {
		await currentUser.removeStory(currentUser, $story.id);
	}

	//update UI
	putOwnStories();
}

$ownStories.on('click', removeOwnStory);
