$('#movie').on('submit', function (e) {
	e.preventDefault();
	const title = $('#title').val();
	const rating = $('#rating').val();

	// Adding Title and Rating to the ordered list
	$('ol')
		.append($('<li>', { text: `Title:${title}    Rating: ${rating}` }))
		.children('li:last-child')
		.append('<button>X</button>');

	// Remove value from the list
	$('button').on('click', function () {
		$(this).closest('li').remove();
	});
	$('#title').empty();
	$('#rating').empty();
});
