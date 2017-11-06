var buenFinHeight = 100;
var topHeader = buenFinHeight - window.scrollY;
topHeader = topHeader < 0 ? 0 : topHeader;
$('#j-header').css('top', topHeader + 'px');

$(window).scroll(function() {
  var topHeader = buenFinHeight - window.scrollY;
  topHeader = topHeader < 0 ? 0 : topHeader;
  $('#j-header').css('top', topHeader + 'px');
});

$(document).ready(function() {
			var clock;
			var date = new Date(2017,10,17);
			var now = new Date();
    	var diff = (date.getTime()/1000) - (now.getTime()/1000);

			var clock = $('.clock-header').FlipClock(diff,{
				clockFace: 'DailyCounter',
				countdown: true,
				showSeconds: true,
				language: "es-es"
			});

});
