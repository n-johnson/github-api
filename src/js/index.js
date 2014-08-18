var _ = require('lodash'),
    GitHub = require('./github');

GitHub.Commits.latest('n-johnson', function(resp) {
    console.log(resp);
});