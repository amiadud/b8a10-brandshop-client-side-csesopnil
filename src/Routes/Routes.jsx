import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import AddProduct from '../components/Products/AddProduct';
import AddBrand from '../components/Brands/AddBrand';
import Brands from '../components/Brands/Brands';
import ProductsRoot from '../components/Products/ProductsRoot';
import SingleProduct from '../components/Products/SingleProduct';
import ProductDetails from '../components/Products/ProductDetails';
import UpdateProduct from '../components/Products/UpdateProduct';
import PrivateRoutes from './PrivateRoutes';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import MyCart from '../pages/MyCart/MyCart';

const Routes = createBrowserRouter( [
    {
      path:'/',
      element: <Root />,
      children: [
        {
          path:'/',
          element:<Home/>,
          loader:()=> fetch('https://mobilemaya-server-side.vercel.app/products/')
        }
      ]
    },
    {
      element:<ProductsRoot />,
      children: [
            {
              path:'/brands',
              element:<Brands />,
              loader: ()=> fetch(`https://mobilemaya-server-side.vercel.app/brands`)
            },
            {
              path:'/products/:name',
              element:<SingleProduct />,
              loader:({params}) => fetch(`https://mobilemaya-server-side.vercel.app/products/${params.name}`)
            },
            {
              path:'/product-details/:id',
              element:<PrivateRoutes><ProductDetails/></PrivateRoutes>,
              loader:({params}) => fetch(`https://mobilemaya-server-side.vercel.app/product/${params.id}`)
            }
            
      ]
    },
    {
      path:'/add-products',
      element:<PrivateRoutes><AddProduct/></PrivateRoutes>
    },
    {
      path:'/update-product/:id',
      element:<PrivateRoutes><UpdateProduct/></PrivateRoutes>,
      loader: ({params})=> fetch(`https://mobilemaya-server-side.vercel.app/product/${params.id}`)
    },
    {
      path:'/add-brands',
      element:<PrivateRoutes><AddBrand/></PrivateRoutes>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/mycarts/:userId',
      element:<MyCart/>,
      loader: ({params})=> fetch(`https://mobilemaya-server-side.vercel.app/mycarts/${params.userId}`)
    }
])

export default Routes;