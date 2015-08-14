module.exports = function(grunt) {

    // Tasks
    grunt.initConfig({
        jshint: {
            all: ['src/jquery.validator.js']
        },

        uglify: {
            app: {
                files: {
                    'dist/jquery.validator.min.js': [
                        'src/jquery.validator.js'
                    ]
                }
            }
        }
    });




    // Process
    grunt.registerTask('default', [
        'jshint'
    ]);
    grunt.registerTask('min', [
        'jshint',
        'uglify:app'
    ]);




    // Require
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};