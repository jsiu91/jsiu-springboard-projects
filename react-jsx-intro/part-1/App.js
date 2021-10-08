const App = () => (
	<div>
		<FirstComponent />
		<NamedComponent name="Jon" />
	</div>
);

ReactDOM.render(<App />, document.getElementById('root'));
