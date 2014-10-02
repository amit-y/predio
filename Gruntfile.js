'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib']
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/foundation/css/**'], dest: 'public/css/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/foundation/js/*.min.js'], dest: 'public/js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.*'], dest: 'public/js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/modernizr/modernizr.js'], dest: 'public/js/', filter: 'isFile'}
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('cp', ['copy']);

};
