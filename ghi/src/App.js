import './App.css';
import {
  Home,
  CardForm,
  CardsList,
  Navbar
} from "./Components/index";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import styles from './style';


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="cards/">
          <Route index element={<CardsList />} />
        </Route>
        <Route path="budgets/">
          <Route></Route>
          <Route></Route>
        </Route>
        <Route path="transactions/">
          <Route></Route>
          <Route></Route>
        </Route>
      </Routes>
    </BrowserRouter>
);
}

export default App;
