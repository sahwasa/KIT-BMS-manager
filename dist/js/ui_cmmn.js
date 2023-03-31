$(function () {
  // toggle button
  $(".btn_tgl").on("click", function (e) {
    e.preventDefault();
    var cur = $(this).attr("datavalue");
    if ($(this).attr("disabled") == "disabled") return false;
    if (cur == "on") {
      $(this).attr("datavalue", "off");
    } else {
      $(this).attr("datavalue", "on");
    }
  });
  //표 줄선택
  $('.row_check').on({
    click : function(e){e.stopPropagation()},
    change : function(){
      var cur = $(this).prop('checked'),
          checkName = 'select_tr';
      if($(this).hasClass('all_check')){
        var childCheck = $(this).parents('table').children('tbody').find('.row_check');
        childCheck.each(function(){
          var elRow = $(this).parents('tr');
          $(this).prop('checked', cur);
          (cur) ? elRow.addClass(checkName) : elRow.removeClass(checkName);
        })
      }else{
        var thisRow = $(this).parents('tr');

        if($(this).prop('type') == 'radio') $(this).parents('table').find('tr').removeClass(checkName);

        (cur) ? thisRow.addClass(checkName) : thisRow.removeClass(checkName);
      }
    }
  });
});