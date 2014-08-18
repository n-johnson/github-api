module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'js/github.js': ['src/js/github.js'],
                    'js/index.js': ['src/js/index.js'],
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/js/*.js']
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['Gruntfile.js', 'src/js/**/*.js'],
                tasks: ['jshint', 'browserify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['watch']);
};
