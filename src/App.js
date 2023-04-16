import Products from "./components/Products";
import Home from "./components/pages/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Cart from "./components/pages/Cart";
import Product from "./components/Product";
import Header from "./components/Header";
import Login from "./components/pages/Login";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="font-bodyFont ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
