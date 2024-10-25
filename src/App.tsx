import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Users from './pages/Users/indext';
import News from './pages/News';

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="news" element={<News />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
