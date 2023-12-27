import serviceUtil from "../ServiceUtil";

const getRentDueDetails = (params) => {
  return serviceUtil
    .get(`getduereportUid?value=${params}`)
    .then((res) => {
      //   console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllRentDueDetails = (params) => {
  return serviceUtil
    .get(`getduereportBid?value=${params}`)
    .then((res) => {
      //   console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { getRentDueDetails, getAllRentDueDetails };
