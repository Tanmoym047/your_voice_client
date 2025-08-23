import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./app";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Root from "./components/Root/Root";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthProvider/AuthProvider";
import PrivateRoute from "./AuthProvider/PrivateRoute";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import BlogDetails from './components/Home/BlogDetails/BlogDetails.jsx';
import AllBlogs from "./components/Blogs/AllBlogs.jsx";
import AddBlogs from "./components/Blogs/AddBlogs.jsx";
import UpdateBlogs from "./components/Blogs/UpdateBlogs.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // {
      //   path: "/featuredblogs",
      //   element: <FeaturedBlogs></FeaturedBlogs>,
      // },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },    
      {
        path: "/blogs/:id",
        element:
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>,
        // loader: ({ params }) => fetch(`http://localhost:5000/allBlogs/${params.id}`)

      },
      {
        path: "/allblogs",
        element:
          <AllBlogs></AllBlogs>,
      },

      {
        path: "/addblog",
        element:
          <PrivateRoute>
            <AddBlogs></AddBlogs>
          </PrivateRoute>,
      },
      {
        path: "/update/:id",
        element:
          <PrivateRoute>
            <UpdateBlogs></UpdateBlogs>
          </PrivateRoute>,
        // loader: ({ params }) => fetch(`http://localhost:5000/allBlogs/${params.id}`)
      },
      // {
      //   path: "/wishlist",
      //   element:
      //     <PrivateRoute>
      //       <Wishlists></Wishlists>
      //     </PrivateRoute>,
      // },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </AuthProvider>

  </React.StrictMode>,
)