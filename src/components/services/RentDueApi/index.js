import serviceUtil from "../ServiceUtil";

const getRentDueDetails = (params) => {
  return serviceUtil
    .get(`getduereport?value=${params}`)
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

export { getRentDueDetails };
