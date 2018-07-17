
       
        var revapi112;
        jQuery(document).ready(function () {
            if (jQuery("#main_slider").revolution == undefined) {
                revslider_showDoubleJqueryError("#main_slider");
            } else {
                revapi112 = jQuery("#main_slider").show().revolution({
                    sliderType: "standard",
                     
                    dottedOverlay: "none",
                    sliderLayout: 'fullwidth',
                    startwidth:1170,
					startheight:700, 
                    delay: 15000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off", 
                        arrows: {
                            enable: true,
                            style: 'metis',
                            hide_onleave: false
                        },
                        
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: false
                        }
                        ,
                        bullets: {
                            enable: false,
                            
                        }
                    },
                     
                    lazyType: "none",
                    parallax: {
                        type: "mouse",
                        origo: "slidercenter",
                        speed: 5000,
                        levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });	/*ready*/
