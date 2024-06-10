const oauthService = require("./auth.service");


// Controller code which orchestrates the overall process
// It calls the service functions where the business logic is present
function oauthProcessor(code, done) {
  /**
   * 
   * Get the access token for the logged in user
   * 
   */
  return oauthService.getGithubAccessToken(code, (err, result) => {
    if (err) {
      done(err)
    } else {
      done(undefined, result)
    }
  })
}

module.exports = {
  oauthProcessor
};