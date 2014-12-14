//Grunt.js
module.exports = function( grunt ) {
	grunt.initConfig({
		secret: grunt.file.readJSON('secret.json'),
		sftp: {
			test: {
				files: {
					"./": "dist/**"
				},
				options: {
					path: '/var/www/html',
					host: '<%= secret.production.host %>',
					username: '<%= secret.production.username %>',
					password: '<%= secret.production.password %>',
					showProgress: true,
					createDirectories: true,
					srcBasePath: "dist/"
				}
			}
		},
		assemble: {
			options: {
				flatten: true,
				assets: 'assets',
				plugins: ['permalinks'],
				partials: ['src/tpl/**/*.hbs'],
				data: ['src/data/*.{json,yml}']
			},
			tpls: {
				src: ['src/tpl/*.hbs'],
				dest: 'dist/',
			}
		},
		uglify: {
			my_target: {
				files: {
					'js/output.min.js': ['src/js/*.js']
				}
			}
		},
		stripmq: {
			options: {
				width: 1000,
				type: 'screen'
			},
			all: {
				files: {
					'css/defaultie.css': ['css/default.css']
				}
			}
		},	
		sass: {
			dist: {
				files: {
					'css/default.css': 'src/scss/default.scss'
				}
			}
		},
		watch: {
			sass: {
				files: ['src/scss/*.scss'],
				tasks: ['sass', 'stripmq']
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['uglify']
			},
			hbs: {
				files: ['src/tpl/**'],
				tasks: ['assemble']
			}
		}
	});

grunt.loadNpmTasks('grunt-ssh');
grunt.loadNpmTasks( 'assemble' );
grunt.loadNpmTasks( 'grunt-stripmq' );
grunt.loadNpmTasks( 'grunt-contrib-sass' );
grunt.loadNpmTasks( 'grunt-contrib-watch' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.registerTask( 'default', ['sass'] );
};