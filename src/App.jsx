import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/FakeAuthContext';
import { lazy, Suspense } from 'react';

// import HomePage from './Pages/HomePage';
// import Product from './Pages/Product';
// import Pricing from './Pages/Pricing';
// import Login from './Pages/Login';
// import AppLayout from './Pages/AppLayout';
// import PageNotFound from './Pages/PageNotFound';

import CityList from './Components/CityList';
import CountryList from './Components/CountryList';
import City from './Components/City';
import Form from './Components/Form';
import ProtectedRoutes from './Pages/ProtuctedRoutes';
import SpinnerFullPage from './Components/SpinnerFullPage';

const HomePage = lazy(() => import('./Pages/HomePage'));
const Product = lazy(() => import('./Pages/Product'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const Login = lazy(() => import('./Pages/Login'));
const AppLayout = lazy(() => import('./Pages/AppLayout'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<CityList />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
