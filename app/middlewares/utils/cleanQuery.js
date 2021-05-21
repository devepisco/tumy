const cleanQuery = (obj) => {
  Object.entries(obj).forEach(([k, v]) => {
    if (v == null) {
      console.log(k, v);
      delete obj[k];
    } else if (typeof v === "object") {
      cleanQuery(v);
    }
  });
  return obj;
};
module.exports = { cleanQuery };
