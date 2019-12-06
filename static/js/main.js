$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 300;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "SHOW MORE >>";
    var lesstext = "SHOW LESS";
    

    $('.descmore').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });	

    var autoCompleteOptions = {
    
      url: function(phrase) {
        return "/suggest";
      },
    
      getValue: function(element) {
        return element.term;
      },
      ajaxSettings: {
        dataType: "json",
        method: "GET",
        data: {
          do: 'search'
        }
      },
    
      preparePostData: function(data) {
        data.q = $("#search-query").val();
        return data;
      },
    
      requestDelay: 300,
      template: {
        type: "links",
            fields: {
                link: "link"
            }
        }

    };
    
    $("#search-query").easyAutocomplete(autoCompleteOptions);

    var startShowDev = 15;
    $('button.showdev').click(function(){
      startShowDev = startShowDev + 15;
      $.ajax({
        url: '/ajax',
        method: 'POST',
        data: {
          do: 'developer',
          dev: $('button.showdev').val(),
          count: startShowDev
        },
        dataType: 'html',
        success: function(data){
          $('.moredev').html(data);
          if(startShowDev > $('button.showdev').attr('id')){
            $('button.showdev').hide();
          }
        }
      });
    });

});


$('.similar_apk').on('click', function() {
$("#LoadingImage").show();
$('.similar_apk').ready(function(){
    $.ajax({
      url: '/ajax',
      method: 'POST',
      data: {
        do: 'similar',
        sId: $('.similar_apk').attr('id')
      },
      dataType: 'html',
      success:function(data){
        if (!$.trim(data)){ 
          $('#LoadingImage').show();
        }
        else {
          $('.similar_apk').html(data);
          $('#LoadingImage').hide();
        }
      }
    });
});

});

$('.similar_apk').trigger('click');

var persearch = 15;
function searchapp(keyword, total){
persearch = persearch + 15;
$('#loading').show();
$.ajax({
  url: '/ajax',
  method: 'POST',
  data: {
    do: 'search',
    s: keyword,
    count: persearch
  },
  dataType: 'html',
  success: function(data){
    $('ul.showsearch').html(data);
    $('#loading').hide();
    if(persearch > total){
        $('button#search_more').hide();
      }
  }
})
};

function download(id, hash){
$('button#downloadapk').hide();
$('.download-area').html('<img src="/assets/img/loader.gif"/>');
$.ajax({
  url: '/dl.php',
  method: 'POST',
  data: {
    id: id,
    hash: hash
  },
  dataType: 'json',
  success: function(e){
    if(e.report == 'success'){
      let name = e.name;
      // window.location =  data.url;
      $('.download-area').html(`${name} Should have already start downloading, <a class="text-danger" rel="noopener noreferrer nofollow" href="${e.url}">click here</a> if it hasn't.<iframe id="iframe_download" referrerpolicy="no-referrer" src="${e.url}" style="display: none"></iframe>`);
      gtag('event', 'Download', {
          'event_category' : 'Success',
          'event_label' : id
        });
    } else {
      gtag('event', 'Download', {
          'event_category' : 'Failed',
          'event_label' : id
        });
      alert('Download Errror, Please refresh the page.');
      window.location.reload();
    }
  }
})
};

function dlversion(pcg, vr, h){
    $('button#dlversion').hide();
    $('.download-area').html('<img src="/assets/img/loader.gif"/>');
    $.ajax({
      url: '/dl-version',
      method: 'POST',
      data: {
        id: pcg,
        v: vr,
        hash: h
      },
      dataType: 'json',
      success: function(data){
        if(data.report == 'success'){
          let name = data.name;
          // window.location =  data.url;
          $('.download-area').html(`<code class="has-text-link">${name}</code> Should have already start downloading, <a class="text-danger" rel="noopener noreferrer nofollow" href="${data.url}">click here</a> if it hasn't.<iframe id="iframe_download" referrerpolicy="no-referrer" src="${data.url}" style="display: none"></iframe>
    `);
          gtag('event', 'DownloadOld', {
				  'event_category' : 'Success',
				  'event_label' : pcg
				});
        } else {
        	gtag('event', 'DownloadOld', {
				  'event_category' : 'Failed',
				  'event_label' : pcg
				});
          alert('Download Errror, Please refresh the page.');
          // window.location.reload();
        }
      }
    })
  }

function dlvariant(pcg, ver, v, t){
    $('#dlvariant-'+v).hide();
    $('.dl'+v).html('<img src="/assets/img/loader.gif"/>');
    $.ajax({
      url: '/ajax',
      method: 'POST',
      data: {
        do: 'dlvariant',
        id: pcg,
        ver: ver,
        v: v,
        t: t
      },
      dataType: 'json',
      success: function(data){
        console.log(data);
        if(data.report == 'success'){
            let name = data.name;
            // window.location =  data.url;
            $('.dlr').addClass('border p-1');
            $('.dlr').html(`<code class="has-text-link">${name}</code> Should have already start downloading, <a class="text-danger" rel="noopener noreferrer nofollow" href="${data.url}">click here</a> if it hasn't.<iframe id="iframe_download" referrerpolicy="no-referrer" src="${data.url}" style="display: none"></iframe>`);
            gtag('event', 'DownloadVariant', {
              'event_category' : 'Success',
              'event_label' : pcg
        });
          } else {
            gtag('event', 'DownloadVariant', {
              'event_category' : 'Failed',
              'event_label' : pcg
            });
            alert('Download Errror, Please refresh the page.');
            // window.location.reload();
          }
        }
    })
  }

