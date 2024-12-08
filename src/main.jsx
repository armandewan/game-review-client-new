import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddReview from "./Pages/AddReview.jsx";
import AllReview from "./Pages/AllReview.jsx";
import MyReview from "./Pages/MyReview.jsx";
import Layouts from "./Layouts.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Registration from "./Pages/Registration.jsx";
import AuthProvider from "./firebase/Provider/AuthProvider.jsx";
import Protected from "./Components/Protected.jsx";
import "react-toastify/dist/ReactToastify.css";
import 'react-tooltip/dist/react-tooltip.css'
import SingleReview from "./Pages/SingleReview.jsx";
import GameWatchList from "./Pages/GameWatchList.jsx";
import Error from "./Pages/Error.jsx";
import UpdateReview from "./Pages/UpdateReview.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "addReview",
        element: (
          <Protected>
            <AddReview></AddReview>
          </Protected>
        ),
      },
      {
        path: "myReviews",
        element: (
          <Protected>
            <MyReview />
          </Protected>
        ),
      },
      {
        path: "review/update/:id",
        element: (
          <Protected>
            <UpdateReview />
          </Protected>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_HOST}/review/${params.id}`).then(
            (res) => res.json()
          ),
      },
      {
        path: "reviews",
        element: <AllReview />,
      },
      {
        path: "review/:id",
        element: <SingleReview />,
      },
      {
        path: "myWatchList",
        element: <Protected><GameWatchList /></Protected>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
