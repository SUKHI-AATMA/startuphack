var windowWidth = $(window).width();
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