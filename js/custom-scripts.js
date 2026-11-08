/*
Author: webthemez.com
Author URL: http://webthemez.com
*/
jQuery(function($) {
    'use strict';

    // Local preview helper: when the site is opened straight from disk (file://),
    // folder links such as "legal/" or "../#contact-us" would show a directory
    // listing. Point them at the folder's index.html. On a web server the clean
    // URLs (/software/, /legal/, ...) are left untouched.
    if (window.location.protocol === 'file:') {
        $('a[href]').each(function() {
            var m = $(this).attr('href').match(/^([^:?#]*\/)(#.*)?$/);
            if (m && m[1].indexOf('//') !== 0) {
                $(this).attr('href', m[1] + 'index.html' + (m[2] || ''));
            }
        });
    }

    $(window).scroll(function(event) {
        Scroll();
    });

    // Smooth-scroll only for links to a section on the current page; links to
    // other department pages navigate normally.
    $('.navbar-collapse ul li a').on('click', function(e) {
        var samePage = this.hostname === window.location.hostname &&
            this.pathname.replace(/^\//, '') === window.location.pathname.replace(/^\//, '');
        var $target = samePage && this.hash ? $(this.hash) : $();
        if (!$target.length) {
            return;
        }
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $target.offset().top - 5
        }, 1000);
        $('.navbar-collapse.in').collapse('hide');
    });

    // Highlight the nav item of the section currently in view (home page only:
    // items marked li.scroll that point at an in-page #anchor).
    function Scroll() {
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        var $items = $('.navbar-collapse li.scroll');
        $items.each(function() {
            var href = $(this).children('a').attr('href') || '';
            var $section = href.charAt(0) === '#' ? $(href) : $();
            if ($section.length && winTop > $section.offset().top - rangeTop) {
                $items.removeClass('active');
                $(this).addClass('active');
            }
        });
    };

    $('#tohash').on('click', function() {
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 5
        }, 1000);
        return false;
    });

  
    new WOW().init();
     
    smoothScroll.init();

    
    $(window).load(function() {
        'use strict';
        var $portfolio_selectors = $('.portfolio-filter >li>a');
        var $portfolio = $('.portfolio-items');
        if (!$portfolio.length || !$.fn.isotope) {
            return;
        }
        $portfolio.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $portfolio_selectors.on('click', function() {
            $portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $portfolio.isotope({
                filter: selector
            });
            return false;
        });
    });

    $(document).ready(function() {
   
        $.fn.animateNumbers = function(stop, commas, duration, ease) {
            return this.each(function() {
                var $this = $(this);
                var start = parseInt($this.text().replace(/,/g, ""));
                commas = (commas === undefined) ? true : commas;
                $({
                    value: start
                }).animate({
                    value: stop
                }, {
                    duration: duration == undefined ? 1000 : duration,
                    easing: ease == undefined ? "swing" : ease,
                    step: function() {
                        $this.text(Math.floor(this.value));
                        if (commas) {
                            $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        }
                    },
                    complete: function() {
                        if (parseInt($this.text()) !== stop) {
                            $this.text(stop);
                            if (commas) {
                                $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                            }
                        }
                    }
                });
            });
        };

        $('.business-stats').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            var $this = $(this);
            if (visible) {
                $this.animateNumbers($this.data('digit'), false, $this.data('duration'));
                $this.unbind('inview');
            }
        });
    });

 
    if ($.fn.prettyPhoto) {
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false
        });
    }
 

});