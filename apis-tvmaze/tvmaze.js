/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows (query) {
	// TODO: Make an ajax request to the searchShows api.  Remove
	// hard coded data.
	const listShows = [];
	const res = await axios.get('http://api.tvmaze.com/search/shows', { params: { q: `${query}` } });
	try {
		for (let show of res.data) {
			listShows.push({
				id: show.show.id,
				name: show.show.name,
				summary: show.show.summary,
				image:
					show.show.image.medium !== null
						? show.show.image.medium
						: 'https://tinyurl.com/tv-missing',
			});
		}
	} catch (e) {
		console.log(e);
	}
	return listShows;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows (shows) {
	const $showsList = $('#shows-list');
	$showsList.empty();

	for (let show of shows) {
		let $item = $(
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <img class="card-img-top" src="${show.image}" onerror="this.onerror=null; this.src="https://tinyurl.com/tv-missing">
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary" type="submit" onclick="getEpisodes(${show.id})">Episodes</button>
           </div>
         </div>
       </div>
      `
		);

		$showsList.append($item);
	}
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch (evt) {
	evt.preventDefault();

	let query = $('#search-query').val();
	if (!query) return;

	$('#episodes-area').hide();

	let shows = await searchShows(query);

	populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes (id) {
	// TODO: get episodes from tvmaze
	//       you can get this by making GET request to
	//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
	// TODO: return array-of-episode-info, as described in docstring above
	const listEpisodes = [];
	const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

	for (let ep of res.data) {
		listEpisodes.push({
			id: ep.id,
			name: ep.name,
			season: ep.season,
			number: ep.number,
		});
	}

	$('#episodes-area').show();
	$('#episodes-list').empty();

	for (let e of listEpisodes) {
		$(`<li>${e.name} (season ${e.season}, number ${e.number})</li>`).appendTo('#episodes-list');
	}
}
