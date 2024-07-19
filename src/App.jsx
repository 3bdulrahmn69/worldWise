import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import Product from './Pages/Product';
import Pricing from './Pages/Pricing';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import AppLayout from './Pages/AppLayout';
import CityList from './Components/CityList';
import CountryList from './Components/CountryList';
import City from './Components/City';
import Form from './Components/Form';
import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/FakeAuthContext';
import ProtectedRoutes from './Pages/ProtuctedRoutes';

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
