const App = () => (
	<div>
		<Person name="Eric" age={30} hobbies={[ 'play volleyball', 'engineering hardware' ]} />
	</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
