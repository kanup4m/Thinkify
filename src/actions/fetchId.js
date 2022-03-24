export const fetchId = (listData) => {
  return (dispatch) => {
    fetch(`https://flipkart-email-mock.now.sh/?id=${listData.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data && data) {
          dispatch({
            type: "FETCH_ID",
            id: data,
          });
          // if (fromCreateEvent) {
          //   dispatch({
          //     type: types.CREATE_EVENT
          //   });
          // }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
