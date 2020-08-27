module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: [{
                    expand: true,
                    src: ['dist/*.js', '!dist/*.min.js'],
                    dest: './',
                    cwd: '.',
                    rename: function (dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        return dst + '/' + src.replace('.js', '.min.js');
                    }
                }]
            }
        },
        exec: {
            tsc: './node_modules/typescript/bin/tsc',
            webpack: './node_modules/.bin/webpack',
            karma: './node_modules/karma/bin/karma start karma.conf.js',
            lint: 'yarn eslint . --ext .ts'
        },
        clean: {
            build: ['build'],
            dist: ['dist']
        },
        watch: {
            scripts: {
                files: ['src/*.ts'],
                tasks: ['build']
            }
        }, 
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    out: 'docs/',
                    name: 'LipwigJS'
                },
                src: 'src/**/*'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    base: ['./dist/', './example/'],
                    keepalive: true
                }
            }
        }
    });

    var previous_force_state = grunt.option("force");

    grunt.registerTask("force",function(set){
        if (set === "on") {
            grunt.option("force",true);
        }
        else if (set === "off") {
            grunt.option("force",false);
        }
        else if (set === "restore") {
            grunt.option("force",previous_force_state);
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Lipwig server
    grunt.registerTask('lipwigStart', function() {
        const Lipwig = require('lipwig');
        lipwig = new Lipwig();
    });
    // Default task(s).
    grunt.registerTask('lipwig', ['force:on', 'lipwigStart', 'force:off']);
    grunt.registerTask('build', ['exec:lint', 'lipwig', 'exec', 'clean:build', 'uglify'])
    grunt.registerTask('lint', ['exec:lint']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('chat', ['lipwigStart', 'connect']);
  };
