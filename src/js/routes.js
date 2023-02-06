const urlRoutes = {
  // this is the object that holds the routes
  404: () => {
    template = "/src/404.html";
    title = "";
    description = "";
  },
  "/": () => {
    template = "/src/index.html";
    title = "";
    description = "";
  },
  "/interactive": () => {
    template = "/src/interactive.html";
    title = "";
    description = "";
  },
};

const urlRoute = (Event) => {
  // this function is called when the user clicks on a link
  Event = Event || window.event;
  Event.preventDefault(); // this prevents the default action of the link
  windows.history.pushState({}, "", Event.target.href); // this changes the url
  urlLocationHandler(); // this runs the function that handles the routing of the website
};

const urlLocationHandler = () => {
  // this is the function that handles the routing of the website
  const location = window.location.pathname;
  if (location.length == 0) {
    urlRoutes["/"]();
  } else if (urlRoutes[location]) {
    urlRoutes[location]();
  } else {
    urlRoutes[404]();
  }
};

// for navbar:
//window.addEventListener("popstate", urlLocationHandler); // run the function on popstate
//window.route = urlRoute; // make the function available to other files in the project (this is used in the navbar)
//urlLocationHandler(); // run the function on load
