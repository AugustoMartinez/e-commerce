/* import '../App.css'; */

const App = ({ nombre, precio }) => {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1 className='title'>{nombre}</h1>
				<h3>${precio}</h3>
			</header>
		</div>
	);
};

export default App;
