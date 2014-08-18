var $ = require('jquery'),
    _ = require('lodash');

var GitHub = {
    domain: 'https://api.github.com',
    get: function(parameters, cb) {
        $.ajax({
            dataType: 'json',
            url: this.domain + parameters,
            success: cb
        });
    },
    Commits: {
        all: function(user, cb) {
            GitHub.get('/users/' + user + '/events', function(resp) {
                var commits = _(resp)
                    .filter({
                        type: 'PushEvent'
                    })
                    .map(function(el) {
                        return _.map(el.payload.commits, function(com) {
                            return {
                                id: el.id,
                                date: el.created_at,
                                url: 'https://github.com/' + el.repo.name + '/commits/' + com.sha,
                                name: el.repo.name,
                                commit: com
                            };
                        });
                    })
                    .reduce(function(res, total, k) {
                        return _.union(total, res);
                    });
                return cb(commits);
            });
        },
        'latest': function(user, cb) {
            GitHub.Commits.all(user, function(commits) {
                return cb(_.last(commits));
            });
        }
    }
};

module.exports = GitHub;