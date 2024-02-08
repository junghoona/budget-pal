import './App.css';
import {
  Home,
  BudgetList,
} from "./Components/index";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="budgets/">
          <Route index element={<BudgetList />} />
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
