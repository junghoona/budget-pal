import './App.css';
import {
  Home
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
    <div>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route exact path="/" element={<Home />} >
            <Route path="cards/">
              {/* <Route path="create" element={<CardForm />} />
              <Route index element={<CardsList />} />
              <Route path=":community_id" element={<CardDetail />} /> */}
            </Route>
            <Route path="budgets/">
              {/* <Route path="all" element={<AllEventList />} />
              <Route path="create" element={<EventForm />} />
              <Route path=":event_id" element={<EventDetails />} /> */}
            </Route>
            <Route path="transactions/">
              {/* <Route path="all" element={<AllEventList />} />
              <Route path="create" element={<EventForm />} />
              <Route path=":event_id" element={<EventDetails />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
