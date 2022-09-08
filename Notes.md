# Description of Calling Backend Services

This section is all about how react compoenent connect with back-end services. We create our fake backened API(application programming interface) using REST (representational state transfer) API through JSON place holder, We can update delete, create, read the data of JSON place holder by this API through online server.

We have json API used for backend operation i.e CRUD for this we can use mutiple methods to fetch the results;

1. axios library (Recommended)
2. Fetch API
3. Jquery HTTP request

## Topics of Calling Backend Services Section

### Create, Read, Update, Delete Operations

We can do CRUD using axios library as follow;

### Life-Cycle of Request

### Optimistic vs Pessimistic Updates

### Expected Vs Unexpected Errors

**Expected ERRORS**

- (404 not-Found, 400 bad Request) - CLIENT ERRORS -> When user send invalid urls or invalid data.
- Display a specific error message to user i.e specific part of data not valid or invalid url

**Unexpected Errors**

- (network error, server down, db down, bug(in App))
- Log them to save later
- Display a generic and User-friendly Error

### Handling unexpexted error globally

### Extracting a reusable http service module

### Extracting a config module

### Displaying Toast Notification

### Loging Errors(SENTRY)
