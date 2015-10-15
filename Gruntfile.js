module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean : [ './build' ],
        concat: {
            js: {
                src: [
                    './app/**/*.module.js',
                    './app/**/*.js',
                    '!./app/**/*.spec.js'
                ],
                dest: './build/concat/app.js'
            },
            css : {
                src : [
                    './css/edoctor.css',
                    './css/edoctor-enhanced.css',
                    './css/select.css',
                    './css/select2.css',
                    './css/angular-social.css'
                ],
                dest : './build/concat/app.css'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './build/ngAnnotate/app-annotate.js' : [ './build/concat/app.js' ]
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: './build/ngAnnotate/app-annotate.js',
                dest: './build/dist/app/app.min.js'
            }
        },
        cssmin: {
           dist: {
              options: {
                 banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
              },
              files: {
                 './build/dist/app/app.min.css': [ './build/concat/app.css' ]
              }
          }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    { expand: true, cwd: './build/dist/app/', src: ['app.min.js'], dest: './build/dist/app/', ext : '.min.js.gz' },
                    { expand: true, cwd: './build/dist/app/', src: ['app.min.css'], dest: './build/dist/app/', ext : '.min.css.gz' }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    { expand: true, src: ['./app/**/*.html'], dest: './build/dist/' },
                    { expand: true, src: ['./images/**/*'], dest: './build/dist/' },
                    {
                        expand: true,
                        src: [
                            './js/angulike.js',
                            'js/angular-social.js',
                            'js/angular-parallax.js',
                            'css/angular-social.css'
                        ],
                        dest: './build/dist/'
                    },
                    {
                        expand: true,
                        src: ['./index-build.html'],
                        dest: './build/dist/',
                        rename : function(dest, src) {
                            return dest + '/index.html';
                        }
                    }
                ],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat', 'ngAnnotate', 'uglify', 'cssmin', 'compress', 'copy']);
};
