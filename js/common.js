var windowWidth = $(window).width(), 
    fullpageBanner = '<!-- Section2 - START --><section class="slides section2"><p class="transpTxt bigTitle">NOTHING<br> NORMAL EVER</p><p class="bigTitle">CHANGED<br> THE WORLD.</p><p class="smallTxt">BUT A COMMUNITY OF WORLD-CONQUERING<br> ENTREPRENEURS JUST MIGHT.</p></section><!-- Section2 - END -->',
    eventsBanner = '<!-- Section1 - START --><section class="slides section1"><div class="lftSec"><img src="images/startup-event-img.jpg" alt="Startup Event" /></div><div class="rgtSec"><p class="smallTxt">LOREM HELSININKI - NOV 21-22, 2019</p><p class="bigTitle">THE<br> WORLD\'S<br> LEADING<br> STARTUP<br> EVENT.</p><p class="introCopy">Just a little gathering of 25,000 changemakers,<br> including 4,000 startups and 2,000 investors.</p><a href="javascript:;" class="button">GRAB YOUR TICKET</a></div></section><!-- Section1 - END -->',
    leftimgBanner = '<!-- Section5 - START --><section class="slides section5"><div class="lftSec"></div><div class="rgtSec"><p class="bigTitle">MAKING<br> ENTREPRENEURIAL<br> WAVES AT HOMR AND<br> AWAY.</p><p class="smallTxt">Lorem has grown from a single gathering in Helsinki to a series of events organized all around the world.We throw bigger events in Finland, Japan, and China, and smaller get-togethers around the globe,from Singapore to NYC. Wherever they happen, our events aim at equipping founders to solve the mostmeaningful problems of our time.</p><a href="javascript:;" class="button">BROWSE OUR EVENTS</a></div></section><!-- Section5 - END -->',
    rightimgBanner = '<!-- Section3 - START --><section class="slides section3"><div class="lftSec"><p class="bigTitle">MAKING<br> ENTREPRENEURIAL<br> WAVES AT HOMR AND<br> AWAY.</p><p class="smallTxt">Lorem has grown from a single gathering in Helsinki to a series of events organized all around the world.We throw bigger events in Finland, Japan, and China, and smaller get-togethers around the globe,from Singapore to NYC. Wherever they happen, our events aim at equipping founders to solve the mostmeaningful problems of our time.</p><a href="javascript:;" class="button">BROWSE OUR EVENTS</a></div><div class="rgtSec"></div></section><!-- Section3 - END -->';

$(function(){
    if(windowWidth > 1024)
    {
      if($('.homepage').length)
      {
        $('.sectionWrapper').fullpage({
          anchors: ['page1', 'page2', 'page3', 'page4'],
          sectionSelector: '.slides',
          animateAnchor: true,
          afterLoad: function(anchorLink, index) {
           if(index!=1)
           {
             $('header').addClass('active');
           }
           else{
            $('header').removeClass('active');
           }
          }
          // css3: true,
          // scrollOverflow: true,
          // scrollOverflowOptions: {
          //     click: false,
          //     tap: true,
          //     interactiveScrollbars: true
          // },
         
        }); 
      }
    }

    if($(".carousel").length)
    {
      $(".carousel").owlCarousel({
        nav: true,
        pagination: true,
        items: 1,
        responsive: {
          1024: {items: 1}
        }
      });
    }
});