import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage, Collection, AnimeDetail, CollectionDetail, PageNotFound } from "./pages"
import Template from './pages/template';
import { ROUTES } from './routes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Template><Homepage/></Template>}></Route>
        <Route path={ROUTES.COLLECTION} element={<Template><Collection/></Template>}></Route>
        <Route path={ROUTES.ANIME_DETAIL} element={<Template><AnimeDetail/></Template>}></Route>
        <Route path={ROUTES.COLLECTION_DETAIL} element={<Template><CollectionDetail /></Template>}></Route>
        <Route path={ROUTES.ALL} element={<Template><PageNotFound/></Template>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
