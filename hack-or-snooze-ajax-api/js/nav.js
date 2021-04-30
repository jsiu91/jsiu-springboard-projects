'use strict';

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show Submit on click on "Submit" */
function navSubmitClick (evt) {
	// console.debug('navSubmitClick', evt);
	hidePageComponents();
	putStoriesOnPage();
	$submitForm.show();
}
$navSubmitStory.on('click', navSubmitClick);

/** Show Favorite stories on click on "favorites" */
function navFavoritesClick (evt) {
	// console.debug('navFavoritesClick', evt);
	hidePageComponents();
	putFavoriteStories();
}
$navFavoriteStories.on('click', navFavoritesClick);

/** Show own stories on click on "my stories" */
function navMyStoriesClick (evt) {
	// console.debug('navMyStoriesClick', evt);
	hidePageComponents();
	putOwnStories();
}
$navMyStories.on('click', navMyStoriesClick);

/** Show main list of all stories when click site name */
function navAllStories (evt) {
	// console.debug('navAllStories', evt);
	hidePageComponents();
	putStoriesOnPage();
}

$body.on('click', '#nav-all', navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick (evt) {
	// console.debug('navLoginClick', evt);
	hidePageComponents();
	$loginForm.show();
	$signupForm.show();
}

$navLogin.on('click', navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin () {
	// console.debug('updateNavOnLogin');
	$('.main-nav-links').show();
	putStoriesOnPage();
	$navLogin.hide();
	$navLogOut.show();
	$navUserProfile.text(`${currentUser.username}`).show();
}
