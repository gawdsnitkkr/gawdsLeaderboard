jQuery(document).ready(function($) {
  $(".row-click").click(function() {
    window.location = $(this).data("href");
  });

  line = $(".toGraph").css("line-height");
});
