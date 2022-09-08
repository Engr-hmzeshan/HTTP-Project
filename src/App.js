import React, { Component } from "react";

// We refactor the code and simple wrap the axios in seperate module where we can do further changes.
import http from "./services/httpService.js";
// We refactor the code and define a seperate module for our configuration
import config from "./config.json";
// We refactor the code and add toast notification
import { ToastContainer } from "react-toastify";
// /media/hafiz/e6ba97b6-d5c0-46a4-9270-df4f69910003/stuff/React/Section 8- Calling Backend Services/start/http-app/node_modules/react-toastify/dist/ReactToastify.css
// import "../node_modules/react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    // We can call the method right after the app mounted in order to fetch the
    // First Method using Fetch API
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // const posts = await response.json();
    // this.setState({ posts });
    //Second Method using http Library
    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }
  // Create
  handleAdd = async () => {
    // First We make an object we need to add in out endPoint
    const obj = { title: "a", body: "b" };
    // Call the http with post method to post the obj in posts array
    const { data: post } = await http.post(config.apiEndPoint, obj);
    // Update the state accordingly
    const posts = [...this.state.posts];
    // Add new element in begining of array
    posts.unshift(post);
    // const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  // Update
  handleUpdate = async (post) => {
    // Property we wanna updated
    post.title = "UPDATED";

    // our endpoint should be appended by '/' to merge exact post.id
    // If we update the object itself we use put method and pass the complete obj.
    await http.put(`${config.apiEndPoint}/${post.id}`, post);

    // If we wanna update one or more properties of an object we simply use patch method and pass the value accordingly
    // const { data } = await http.patch(`${config.apiEndPoint}/${post.id}`, {
    //   title: post.title,
    // });

    // Render Updated Result
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  // Delete
  handleDelete = async (post) => {
    // Pessimistic Delete

    // We update the state once it done from the server i.e updated, deleted etc which take half a second or more
    // First we directly remove the posts from server through http methods and then render result accordinly
    // await http.delete(`${config.apiEndPoint}/${post.id}`);
    // const posts = this.state.posts.filter((pos) => pos.id !== post.id);
    // this.setState({ posts });

    // Optimistic Delete
    // We first update the state and then call the server for chaning in the data i,e deleting, updating the posts.

    // 1. Take a clone of original data,
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((pos) => pos.id !== post.id);
    // 2. update the state immediately before calling to server
    this.setState({ posts });
    try {
      // 3. Wrap the code of server request in try catch block
      await http.delete(`${config.apiEndPoint}/${post.id}`);
    } catch (ex) {
      // ex.request is not valid then it's expectd or client error
      // ex.response is not valid then it's an unexpected error
      if (ex.response && ex.response.status === 404)
        // 4. in case of error revert the state to original data
        alert("This post has already been deleted"); // Specific error message for expected errors
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2>
          {" "}
          Showing{" "}
          <span className="badge badge-secondary">
            {this.state.posts.length}
          </span>{" "}
          Posts in data Base.
        </h2>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
