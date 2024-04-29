import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { fetchData, sendCartData } from "./store/cart-actions";

let isFirstRender = true;

function App() {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);
    const cart = useSelector((state) => state.cart);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    useEffect(
        () => {
            if (isFirstRender) {
                isFirstRender = false;
                return;
            }

            if (cart.changed) {
                dispatch(sendCartData(cart));
            }

        },
        [cart,
        dispatch]
    );

    // useEffect(() => {
    //     const sendRequest = async () => {
    //         if (isFirstRender) {
    //             isFirstRender = false;
    //             return;
    //         }
    //         // Send state as Sending request
    //         dispatch(
    //             uiActions.showNotification({
    //                 open: true,
    //                 message: "Sending Request",
    //                 type: "warning",
    //             })
    //         );
    //         const res = await fetch(
    //             "https://redux-http-b8926-default-rtdb.firebaseio.com/cartItems.json",
    //             {
    //                 method: "PUT",
    //                 body: JSON.stringify(cart),
    //             }
    //         );
    //         const data = await res.json();
    //         // Send state as Request is successful
    //         dispatch(
    //             uiActions.showNotification({
    //                 open: true,
    //                 message: "Sent Request To Database Successfully",
    //                 type: "success",
    //             })
    //         );
    //     };
    //     sendRequest().catch((err) => {
    //         // Send state as Error
    //         dispatch(
    //             uiActions.showNotification({
    //                 open: true,
    //                 message: "Sent Request Failed ",
    //                 type: "error",
    //             })
    //         );
    //     });
    // }, [cart]);

    return (
        <div className="App">
            {notification.open && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                />
            )}
            {!isLoggedIn && <Auth />}
            {isLoggedIn && <Layout />}
        </div>
    );
}

export default App;
