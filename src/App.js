import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage'
import SearchResult from './pages/SearchResult'
import ProductPreview from './pages/ProductPreview'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import News from './pages/News'
import NoPage from './pages/NoPage'
import Support from './pages/Support'
import Promotion from './pages/Promotion'
import ReadArticle from './pages/ReadArticle'
import Layout from './components/Layout'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="product-preview/:productId" element={<ProductPreview />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="news" element={<News />} />
          <Route path="support" element={<Support />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="read-article/:articleId" element={<ReadArticle />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;