$(function () {
  // nav
	var $deps1=$('.lnb>li'),
    	$deps2=$('.sub li'),
			//$locate=$('.locate_list>li'),
			//$loca1=$('.loca1 > li'),
			//$loca2=$('.loca2 > li'),
    	preLocate,deps1Locate,deps2Locate,
    	indexDeps1,getDeps,indexDeps2,
    	locate=window.location.href;

	menuInit();
	function menuInit(){
		$deps1.each(function(index, item){
			var getAttr=$(this).children('a').attr('href');
			index+=1;
			indexDeps1=$(this).children('a').attr('href', getAttr + "?index="+ index +',1');
			indexDeps2=$(this).find($deps2);

			getDeps=$(this).children('a').attr('href');
			indexDeps2.each(function(index2, item){
	      getAttr=$(this).children('a').attr('href');
	      index2+=1;
	      indexDeps2=$(this).children('a').attr('href', getAttr + "?index="+index+',' + index2);
			});
	  });
  };
  
		if(locate.indexOf("index=")>-1){
			preLocate=locate.split("index=")[1].split(',');
			deps1Locate=preLocate[0]-1;
			deps2Locate=preLocate[1]-1;

      $deps1.eq(deps1Locate).addClass('on');
      $deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).addClass('on');
			$loca1.eq(deps1Locate).addClass('on');
			$loca2.eq(deps2Locate).addClass('on');
			$loca1.each(function(index,item){
				getAttr=$(this).children('a').attr('href');
				index+=1;
				indexDeps1=$(this).children('a').attr('href', getAttr + "?index="+ index +',1');
			});
			var locaDeps1 = deps1Locate + 1;
			$loca2.each(function(index,item){
				getAttr=$(this).children('a').attr('href');
				index+=1;
				$loca2=$(this).children('a').attr('href', getAttr + "?index="+locaDeps1 +',' + index);
			});
		}
 

  function menu1Open(onItem){
    onItem = onItem.parent('li');
		if(!(onItem.hasClass('on'))){
			if(onItem.children('ul').length === 0){
				$deps1.removeClass('on');
				onItem.addClass('on');
			}
		}
  }
  function menu2Open(onSubItem){
		$deps1.removeClass('on');
		$deps2.removeClass('on');
		onSubItem.addClass('on').parents('li').addClass('on');
  }

  $deps1.children('a').on('click',function(){menu1Open($(this))});
  $deps2.on('click',function(){menu2Open($(this))});

	// $locate.on('click', function(e){
	// 	e.stopPropagation();
	// 	$(this).toggleClass('on');
	// 	$(this).children('.sub_loca').slideToggle();
	// });

  //gnb
  $('.profile').on({
    'click' : function(){$(this).addClass('on');},
    'focusin' : function(){$(this).addClass('on');},
    'focusout' : function(){$(this).removeClass('on');},
  })

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

  // table_row checked
  $('.row_check').on({
    click : function(e){e.stopPropagation()},
    change : function(){
      var cur = $(this).prop('checked'),
          checkName = 'select_tr';
      if($(this).hasClass('all_check')){
        var childCheck = $(this).parents('.tbl_wrap').find('tbody').find('.row_check');
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

  // sortable
  function sortable() {
    $('.sortable').sortable({
      scroll: false,
      cursor: 'move',
      connectWith: '.move_sortable',
      placeholder: 'sortable_style', // drag : border style(css)
      forcePlaceholderSize: true,
      stop: function () {
        $('.tree li').removeClass('arrow')
        $('.tree li:has(li)').addClass('arrow')
      }
    })
  }
  sortable()

  // tree
  $('.tree li:has(li)').addClass('arrow')
  $('.tree').on('click', 'li>span', function () {
    var children = $(this).parent('li.arrow').find(' > ul > li')
    if (children.is(':visible')) {
      children.hide(0)
      $(this).parent('li').addClass('close')
      $(this).next('ul').removeClass('move_sortable')
    } else {
      children.show(0)
      $(this).parent('li').removeClass('close')
      $(this).next('ul').addClass('move_sortable')
    }
    return false
  })
  // add, edit, delete
  $.editOgtName = function () {
    var editInputWrap = $(this).parent('div')
    var editInput = $(this).val()
    if (editInput === '') {
      var editInput = '새 조직 '
    }
    var editInput = $('<span>' + editInput + '</span>')
    $(this).parent('div').children('input').remove()
    $(editInputWrap).prepend(editInput)
    $('.doneAddOgt, .doneEditOgt').hide()
    $('.addOgt, .editOgt').show()
  }
  // delete item
  $('.delOgt').on('click', function () {
    if ($('.tree').find('.hover').length > 0) {
      if(!confirm("선택 조직을 정말 삭제하시겠습니까?")){
        alert('취소 되었습니다.');
      }else{
        $('.hover').parent('li').remove()
        $('.tree li').removeClass('arrow')
        $('.tree li:has(li)').addClass('arrow')
      }
    } else {
      alert('삭제할 그룹을 선택해주세요')
    }
  })
  // add item
  $('.addOgt').on('click', function () {
    $(this).hide()
    $('.doneAddOgt').show()
    var addLi = $('<li class="ui-sortable-handle">')
    var addSpan = $('<span>그룹 접기/열기</span>')
    var addDiv = $('<div>')
    var addUl = $('<ul class="sortable move_sortable ui-sortable">')
    var addInput = $('<input type="text" placeholder="조직명을 입력하세요">')
    var addpeople = $('<span>(0)</span>')
    addLi.append(addSpan, addDiv, addUl)
    addDiv.append(addInput, addpeople)
    $('.tree').prepend(addLi)
    sortable()
    $(addLi).find('input').focus()
    $(addLi).find('input').focusout($.editOgtName)
    $(addLi).find('input').keydown(function(key){
      if(key.keyCode == 13){
        $.editOgtName()
        $(addLi).find('input').focusout()
      }
    })
  })
  // edit item
  $('.tree').on('click', 'div', function () {
    $('.tree div').removeClass('hover')
    $(this).addClass('hover')
  })
  $('.editOgt').on('click', function () {
    if ($('.tree').find('.hover').length > 0) {
      $(this).hide()
      $('.doneEditOgt').show()
      var editDiv = $('.hover')
      var editSpan = editDiv.children('span:first-child')
      var editInput = $(`<input type="text" placeholder="조직명을 입력하세요" value="${editSpan.text()}">`)
      editSpan.remove()
      editDiv.prepend(editInput)
      editInput.focus()
      editInput.focusout($.editOgtName)
      editInput.keydown(function(key){
        if(key.keyCode == 13){
          $.editOgtName()
          editInput.focusout()
        }
      })
    } else {
      alert('수정할 그룹을 선택해주세요')
    }
  })
  $('.doneAddOgt, .doneEditOgt').on('click', $.editOgtName)
});