describe('TV Maze query search', () => {
	it('GET /search/shows should return 200 response', (done) => {
		axios.get('http://api.tvmaze.com/search/shows', { params: { q: 'bletchley' } }).then((response) => {
			console.log(response);
			expect(response.status).toBe(200);
			expect(response.statusText).toBe('OK');
			done();
		});
	});

	it('GET /shows/id/episodes should return 200 response', (done) => {
		axios.get(`http://api.tvmaze.com/shows/1/episodes`).then((response) => {
			console.log(response);
			expect(response.status).toBe(200);
			expect(response.statusText).toBe('OK');
			done();
		});
	});
});
