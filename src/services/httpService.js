// We refactor the code by adding the toaster notification
// import { toast } from "react-toastify";
import axios from "axios";
// We only use intercepter for more generic unexpected(Response get invalid due to network) errors.
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Log The Error", error);
    alert("An unexpected error ocurred");
    // toast("An unexpected error ocurred"); // Generic error message for unexpected error
  }
  return Promise.reject(error);
});
export default {
  // create
  post: axios.post,
  // read
  get: axios.get,
  // update
  put: axios.put, //update entire object
  patch: axios.patch, // update one or more properties
  // delete
  delete: axios.delete,
};
