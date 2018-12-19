const gulp = require('gulp'),
    header = require('gulp-header'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass')
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    //uglify = require('gulp-uglify'), 
    uglify =  require('gulp-uglify-es').default, 
    merge = require("merge-stream"),
    babel = require('gulp-babel'),
    pkg = require('./package.json');
 


const regex = {
    css: /\.css$/,
    html: /\.(html|htm)$/,
    js: /\.js$/,
};
const paths = {
    portal_dist: "./wwwroot/portal",  
    portal_src: "./src/portal",
    admin_dist: "./wwwroot/admin",
    admin_src : "./src/admin/",
    shop_dist : "./wwwroot/shop",
    shop_src  : "./src/shop/"
}
//[========================================================================]
//[=================== Portal Config ======================================]
//[========================================================================]
const portal_config = {
    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n',
    sassOptions: {
        outputStyle: 'compressed'
    },
    fonts : [
        {
            output : paths.portal_dist + "/fonts/fa/",
            input : [
                './node_modules/font-awesome/fonts/*',
            ]
        },{
            output : paths.portal_dist + "/fonts/",
            input : [
                paths.portal_src + '/fonts/**/*'
            ]
        }
        ],
    css: {
        src: [
            paths.portal_src + '/scss/**/*.scss'
        ],
        dist: paths.portal_dist + "/css/",
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js: {
        dist: paths.portal_dist + "/js",
        watch : paths.portal_src + "/js/**/*.js",
        files :[
            {
                outputFileName : "bundle.js",
                es6 : false,
                inputFiles: [ 
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                    './node_modules/jquery-parallax.js/parallax.min.js',
                    './node_modules/waypoints/lib/jquery.waypoints.min.js',
                    './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
                ],
            },
            {
                outputFileName : "script.js",
                es6 : true,
                inputFiles: [
                     paths.portal_src + '/js/scripts.js'
                ],
            },
            {
                outputFileName : "validation.js",
                es6 : false,
                inputFiles :[
                    './node_modules/jquery-validation/dist/jquery.validate.min.js',
                    './node_modules/jquery-validation/dist/additional-methods.js',
                    paths.portal_src + '/js/validate.js'
                ]
            }, 
            {
                outputFileName : "owl.carousel.js",
                es6 : false,
                inputFiles: [
                    './node_modules/owl.carousel/dist/owl.carousel.min.js',
                ],
            },
            {
                outputFileName : "counterup.js",
                es6 : false,
                inputFiles: [
                    paths.portal_src + '/js/jquery.counterup.js'
                ],
            },
            {
                outputFileName : "slider.js",
                es6 : false,
                inputFiles: [
                    paths.portal_src + '/js/jquery.themepunch.tools.min.js',
                    paths.portal_src + '/js/jquery.themepunch.revolution.min.js',
                    paths.portal_src + '/js/slider.js'
                ]
            },
            {
                outputFileName : "magnific-popup.js",
                es6 : false,
                inputFiles: [
                    './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
                ],
            }, 
        ]
    }, 
} 
//[========================================================================]
//[=================== Admin Config =======================================]
//[========================================================================]
const  admin_config = {
    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n',
    sassOptions: {
        outputStyle: 'compressed'
    },
    css: {
        src: [
            paths.admin_src + '/scss/**/*.scss'
        ],
        dist: paths.admin_dist + "/css/",
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js:{
        dist: paths.admin_dist + "/js",
        watch : paths.admin_src + "/js/**/*.js",
        files :[
            {
                outputFileName : "script.js",
                inputFiles: [
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                    './node_modules/bootstrap-notify/bootstrap-notify.min.js',
                    './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                     paths.admin_src + '/js/scripts.js'
                ],
            },
            {
                outputFileName : "product.js",
                es6 : true,
                inputFiles: [
                    
                     paths.admin_src + '/js/product/product.js',
                     paths.admin_src + '/js/product/specifications.js',
                     paths.admin_src + '/js/product/images.js',
                     paths.admin_src + '/js/product/attrbuites.js',
                     paths.admin_src + '/js/product/description.js',
                     paths.admin_src + '/js/product/combinations.js'
                ],
            },
            {
                outputFileName : "users.js",
                inputFiles: [
                     paths.admin_src + '/js/users.js'
                ],
            },{
                outputFileName: "validator.js",
                inputFiles: [
                    paths.admin_src + '/js/validator.js'
                ],
            },{
                outputFileName: "menu.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/menu.js'
                ],
            },{
                outputFileName: "sliders.js",
                es6 : false,
                inputFiles: [  
                    paths.admin_src + '/js/sliders.js'
                ],
            },{
                outputFileName: "services.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/services.js'
                ],
            },{
                outputFileName: "galleries.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/galleries.js'
                ],
            },
            ,{
                outputFileName: "lightbox.js",
                es6 : false,
                inputFiles: [  
                     "./node_modules/lightbox2/dist/js/lightbox.min.js"
                ],
            },
            {
                outputFileName: "seo.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/seo.js'
                ],
            },
            {
                outputFileName: "pages.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/pages.js'
                ],
            },
            {
                outputFileName : "serializejson.js",
                inputFiles: [
                    './node_modules/jquery-serializejson/jquery.serializejson.min.js', 
                ],
            },
            {
                outputFileName: "sections.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/sections.js'
                ],
            },
            {
                outputFileName: "posts.js",
                es6 : true,
                inputFiles: [  
                    paths.admin_src + '/js/posts.js'
                ],
            },
        ]
    }
}


//[========================================================================]
//[=================== Shop Config ========================================]
//[========================================================================]
const shop_config = {
    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n',
    fonts : [
            {
                output : paths.shop_dist + "/fonts/fa/",
                input : [
                    './node_modules/font-awesome/fonts/*',
                ]
            },{
                output : paths.shop_dist + "/fonts/",
                input : [
                    paths.shop_src + '/fonts/**/*'
                ]
            }
    ],

    sassOptions: {
        outputStyle: 'compressed'
    },
    css: {
        src: [
            paths.shop_src + '/scss/**/*.scss'
        ],
        dist: paths.shop_dist + "/css/",
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js : {
        dist: paths.shop_dist + "/js",
        watch : paths.shop_src + "/js/**/*.js",
        files :[
            {
                outputFileName : "bundle.js",
                es6 : false,
                inputFiles: [
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                    './node_modules/bootstrap-notify/bootstrap-notify.min.js',
                    './node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                ],
            },
            {
                outputFileName : "script.js",
                es6 : true,
                inputFiles: [
                     paths.shop_src + '/js/notification.js',
                     paths.shop_src + '/js/productManage.js',
                     paths.shop_src + '/js/scripts.js'

                ],
            },{
                outputFileName : "product.js",
                es6 : false,
                inputFiles: [
                   // './node_modules/owl.carousel/dist/owl.carousel.min.js',
                    './node_modules/lightslider/dist/js/lightslider.min.js',
                     paths.shop_src + '/js/product.js'
                ],
            },
            {
                outputFileName : "jquery-validate.js",
                es6 : false,
                inputFiles: [
                    './node_modules/jquery-validation/dist/jquery.validate.min.js',
                    './node_modules/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js'
                ], 
            } 
        ]
    }
}


function getBundles(regexPattern , files ) {
    return files.filter(function (bundle) {
        return regexPattern.test(bundle.outputFileName);
    });
}


//-------------------------------------------------
// --  portal style files 
//-------------------------------------------------
gulp.task('p:css', ()=> {
    return gulp.src(portal_config.css.src)
        .pipe(sass(portal_config.sassOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(portal_config.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(portal_config.css.prefixerOptions))
        .pipe(gulp.dest(portal_config.css.dist));
});
// ----------------------------------------------------
// -- portal javscript files
// ----------------------------------------------------
gulp.task("p:js",  ()=> {
    let tasks = getBundles(regex.js , portal_config.js.files).map( (file)=> {

        let  g = gulp.src(file.inputFiles, { base: "." })
                .pipe(concat(file.outputFileName));
            
                if(file.es6){
                    g.pipe(babel({
                        presets: [['env', { modules: false }]],
                    }))
                } 
                g.pipe(uglify({
                    mangle: true
                }))
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(header(portal_config.header, {
                    pkg: pkg
                }))
                .pipe(gulp.dest(portal_config.js.dist));
            return g;
                    
         
        
    });
    return merge(tasks);
});
// ----------------------------------------------------
// -- portal fonts files
// ----------------------------------------------------

gulp.task('p:f', function() {

    let tasks = portal_config.fonts.map((folder)=>{
       return gulp.src(folder.input)
       .pipe(gulp.dest(folder.output))
    })
    
    return merge(tasks)
 })


// ----------------------------------------------------
// -- portal  watch files
// ----------------------------------------------------
gulp.task('p:w',  ()=> {
    gulp.watch(portal_config.js.watch, ['p:js']);
    gulp.watch(portal_config.css.src, ['p:css']);
});


//-------------------------------------------------
// --  admin style files 
//-------------------------------------------------

gulp.task('a:css',  ()=> {
    return gulp.src(admin_config.css.src)
        .pipe(sass(admin_config.sassOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(admin_config.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(admin_config.css.prefixerOptions))
        .pipe(gulp.dest(admin_config.css.dist));
});
// ----------------------------------------------------
// -- admin javscript files
// ----------------------------------------------------
gulp.task("a:js",  ()=> {

 

    var tasks = getBundles(regex.js , admin_config.js.files).map( (file)=> {


        
        let g =  gulp.src(file.inputFiles, { base: "." })
                .pipe(concat(file.outputFileName));
                if(file.es6){
                    g.pipe(babel({
                        presets: [['env', { 
                                modules: false ,
                                "targets": {
                                    
                                    "browsers": [ ">0.25%"]
                                  }
                            }]],
                    }))
                } 

                 /* g.pipe(uglify({
                    mangle: false
                })) */

                 g.pipe(rename({
                    suffix: '.min'
                }))
                .pipe(header(admin_config.header, {
                    pkg: pkg
                }))
                .pipe(gulp.dest(admin_config.js.dist));

        return g;
    });
    return merge(tasks);


}); 

// ----------------------------------------------------
// -- admin  watch files
// ----------------------------------------------------
gulp.task('a:w',  ()=> {
    gulp.watch(admin_config.js.watch, ['a:js']);
    gulp.watch(admin_config.css.src, ['a:css']);
});




//-------------------------------------------------
// --  shop style files 
//-------------------------------------------------
gulp.task('s:css', ()=> {
    return gulp.src(shop_config.css.src)
        .pipe(sass(shop_config.sassOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(shop_config.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(shop_config.css.prefixerOptions))
        .pipe(gulp.dest(shop_config.css.dist));
});
// ----------------------------------------------------
// -- shop javscript files
// ----------------------------------------------------


function es6(){
    
}
gulp.task("s:js",  ()=> {
    let tasks = getBundles(regex.js , shop_config.js.files).map( (file)=> {

        let  g = gulp.src(file.inputFiles, { base: "." })
                .pipe(concat(file.outputFileName));
            
                if(file.es6){
                    g.pipe(babel({
                        presets: [['env', { modules: false }]],
                    }))
                } 
                g.pipe(uglify({
                    mangle: true
                }))
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(header(shop_config.header, {
                    pkg: pkg
                }))
                .pipe(gulp.dest(shop_config.js.dist));
            return g;
                    
         
        
    });
    return merge(tasks);
});

// ----------------------------------------------------
// -- shop fonts files
// ----------------------------------------------------

gulp.task('s:f', function() {

     let tasks = shop_config.fonts.map((folder)=>{
        return gulp.src(folder.input)
        .pipe(gulp.dest(folder.output))
     })
     
     return merge(tasks)
  })


// ----------------------------------------------------
// -- shop  watch files
// ----------------------------------------------------
gulp.task('s:w',  ()=> {
    gulp.watch(shop_config.js.watch, ['s:js']);
    gulp.watch(shop_config.css.src, ['s:css']);
});






// portal 
gulp.task('p', ['p:css', 'p:js' ]); 

// admin 
gulp.task('a', ['a:css', 'a:js' ]); 

//shop
gulp.task('s', ['s:css', 's:js'  ,'s:f']); 

//
gulp.task('default', ['p' ,'a' ,'s' ]); 

 