import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

//we do the action creator thunks here
//it is a function that delays the action till later.

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://testreact-6f9ed-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data..");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      //dispatch the show notifications action by calling the shownotification function in ui-slice's reducer
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed.",
        })
      );
    }
  };
};

//when we call the sendCartData (when we dispatch it in the component), redux will execute the function it returns.
export const sendCartData = (cart) => {
  //to create an action creator we need to return a function(in javascript we can do it)
  //when you return a function in a function creator, the redux will execute it and pass the dispatch
  //insde this function we can dispatch an action like showing a notification
  //beacuse we are not in a reducer, before dispatching an action we can do synchronous code of course.
  return async (dispatch) => {
    //dispatch the show notifications action by calling the shownotification function in ui-slice's reducer
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending the cart data...",
      })
    );

    //the idea is to create the function and then call it inside try/catch to handle errors
    const sendingRequest = async () => {
      const response = await fetch(
        "https://testreact-6f9ed-default-rtdb.firebaseio.com/cart.json",
        {
          //the difference between PUT and POST
          //when we send a PUT request, the data will be overwritten on the previous data
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sendig cart Data Failed.");
      }
    };

    try {
      await sendingRequest();
      //dispatch the show notifications action by calling the shownotification function in ui-slice's reducer
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      //dispatch the show notifications action by calling the shownotification function in ui-slice's reducer
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};
