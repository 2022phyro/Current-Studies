const blogsService = require("./blogs.service"); 

const saveBlog = function (blog, done) {
  // call the method from blogs service to save the blog
  blogsService.saveBlog(blog, (err, results) => {
    if (err) {
      // EXITING
      return done({ "error": "Encountered data error in saving blog..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const findBlogs = function (done) {
  // call the method from blogs service to fetch all blogs
  blogsService.findBlogs((err, results) => {
    if (err) {
      return done({ "error": "Encountered data error in fetching blogs..!" });
    }

    return done(null, results);
  });
}
 

module.exports = {
  saveBlog,
  findBlogs
}