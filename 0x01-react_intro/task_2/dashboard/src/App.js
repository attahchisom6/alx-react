import logo from './holberton-logo.jpg';
import './App.css';
import utils from './utils';
const { getFullYear, getFooterCopy } = utils;

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={ logo } alt="Holberton" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email"></input>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password"></input>
          <button>Ok</button>
        </form>
      </div>
      <div className="App-footer">
        <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
      </div>
    </div>
  );
}

export default App;
