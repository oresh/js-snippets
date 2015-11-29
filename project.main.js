/* Main scripts file. */

(function($) {

  /**
   * Helper function to get real window width
   */
  function getWindowWidth() {
    var windowWidth = 0;
    if (typeof(window.innerWidth) == 'number') {
      windowWidth = window.innerWidth;
    } else {
      if (document.documentElement && document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      } else {
        if (document.body && document.body.clientWidth) {
          windowWidth = document.body.clientWidth;
        }
      }
    }
    return windowWidth;
  }

  /**
   * Sticky footer
   * ex: .sticky-footer
   * ex: [PROJECTNAME-sticky-footer]
   */
  PROJECTNAME.Behavior.stickyFooter = function(settings) {
    var $stickyFooter = $('.sticky-footer', settings.context);
    $stickyFooter.add('[PROJECTNAME-sticky-footer]');
    if (settings.selector) $stickyFooter.add(settings.selector, settings.context);

    if (selector) $stickyFooter.add(selector);

    if ($stickyFooter.length) {
      var footerHeight = 0;
      var bodyHeight = 0;
      var vwptHeight = 0;
      var wrapperHeight = 0;
      var $body = $('body');
      var $mainwrapper = $('.main-wrapper');

      PROJECTNAME.Functions.positionFooter = function() {
        $mainwrapper.css('min-height', 0);
        footerHeight = $stickyFooter.outerHeight();
        bodyHeight = $body.height();
        vwptHeight = $(window).height();
        wrapperHeight = $mainwrapper.height();
        if (vwptHeight > bodyHeight) {
          $mainwrapper.css('min-height', vwptHeight - footerHeight);
        }
      };

      PROJECTNAME.Functions.positionFooter();

      $(window).load(function() {
          PROJECTNAME.Functions.positionFooter();
      });

      $(window).resize(function() {
          window.clearTimeout(stickyFooterTimeout);
          var rate = window.PROJECTNAME.refreshRate
          var stickyFooterTimeout = setTimeout(function() {
            PROJECTNAME.Functions.positionFooter();
          }, rate);
      });
    }
  }

  /**
   * Chosen selects
   * ex: select.chosen-select
   * ex: select[PROJECTNAME-chosen-select]
   */
  PROJECTNAME.Behavior.chosenSelect = function(settings) {
    var $select = $('.chosen-select', settings.context);
    $select.add("[PROJECTNAME-chosen-select]", settings.context);
    if (settings.selector) $select.add(settings.selector, settings.context);

    if (settings.selector) $select.add(selector, context);

    if ($select.length) {
      for (var i = 0, len = $select.length; i < len; i++) {
        var $this = $select.eq(i);
        if ($this.hasClass('multiple') || $this.attr('PROJECTNAME-chosen-select') == 'multiple') {
          // chosen multiple
        } else if ($this.hasClass('custom') || $this.attr('PROJECTNAME-chosen-select') == 'custom') {
          // custom chosen
        } else {
          // basic chosen no search
          $this.chosen({
            disable_search: true,
            width: '100%',
            display_disabled_options: false
          });
        }
      }
    }
  }

  /**
   * Simple popup open
   * ex: a.popup-link[PROJECTNAME-popup-block="#popup"]
   * ex: [PROJECTNAME-popup-block="#popup"]
   * popup [PROJECTNAME-popup-link="#popup-link"]
   */
  PROJECTNAME.Behavior.popupShow = function(settings) {
    var $linkPopup = $('[PROJECTNAME-popup-block]', settings.context);
    if (settings.selector) $linkPopup.add(settings.selector, settings.context);

    if ($linkPopup.length) {
      var $mainContent = $('.main-content');
      var $body = $('body');
      $mainContent.removeClass('popup-opened');
      $linkPopup.removeClass('is-active');

      $body.on('click', '[PROJECTNAME-popup-block]', function(e) {
        var $this = $(this).addClass('is-active');
        var $popup = $($this.attr('PROJECTNAME-popup-block'));
        $popup.show();
        $mainContent.addClass('popup-opened');
        e.stopPropagation();
        e.preventDefault();
      });

      $('body').on('click', '.popup .icon-close', function() {
        var $this = $(this);
        $this.closest('.popup').hide();
        $linkPopup = $($this.attr('PROJECTNAME-popup-link'))
        $linkPopup.removeClass('is-active');
        $mainContent.removeClass('popup-opened');
        e.stopPropagation();
        e.preventDefault();
      });

      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          $('.popup').hide();
          $linkPopup.removeClass('is-active');
          $mainContent.removeClass('popup-opened');
        }
      });
    }
  }

  /**
   * Simple dropdown
   * ex: .link-dropdown
   * ex: [PROJECTNAME-link-dropdown]
   */
  PROJECTNAME.Behavior.dropdownToggle = function(settings) {
    var $linkDropdown = $('.link-dropdown', settings.context);
    $linkDropdown.add('[PROJECTNAME-link-dropdown]', settings.context);
    if (settings.selector) $linkDropdown.add(settings.selector, settings.context);

    if ($linkDropdown.length) {
      $('body').on('click','.link-dropdown, [PROJECTNAME-link-dropdown]', function(e) {
        var $this = $(this)
        var  $dDContainer = $this.parent();
        if ($dDContainer.hasClass('is-opened')) {
          $dDContainer.removeClass('is-opened');
        } else {
          $('.has-dropdown').removeClass('is-opened');
          $dDContainer.addClass('is-opened');
        }
        e.stopPropagation();
        e.preventDefault();
      });

      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          $('.has-dropdown').removeClass('is-opened');
        }
      });
    }
  }

  /**
   * Toggle collapsible blocks
   * ex: [PROJECTNAME-collapse="next"]
   * ex: [PROJECTNAME-collapse="next-all"]
   * ex: [PROJECTNAME-collapse="next-all-parent"]
   * ex: [PROJECTNAME-collapse="el:.classname"]
   * ex: [PROJECTNAME-collapse="el:.classname, class:activeclass"]
   **/
  PROJECTNAME.Behavior.fxCollapsible = function(settings) {
    var $collapsibles = $('.collapse-content', settings.context);
    $collapsibles.add('[PROJECTNAME-collapse-content]', settings.context);
    if (settings.selector) $collapsibles.add(settings.selector, settings.context);

    if ($collapsibles.length) {
      if (!$collapsibles.eq(0).hasClass('collapse-content-processed')) {
        // close collapse
        function closeCollapsible($colapse, time) {
          if (typeof time == 'undefined') time = 300;
          $colapse.slideUp(time);
        }
        // toggle collapse
        fution toggleCollapse($colapse, time) {
          if (typeof time == 'undefined') time = 300;
          if (time == 0) {
            if ($colapse.is(":visible")) {
              $colapse.hide();
            } else {
              $colapse.show();
            }
          } else {
            $colapse.slideToggle(time);
          }
        }
        $collapsibles.hide();
        $collapsibles.filter('.opened').show();
        $collapsibles.filter('.opened').parent().find('[winestyle-collapse]').addClass('active');

        // add processed class
        $collapsibles.addClass('collapse-content-processed');

        // close collapsible on X click.
        $collapsibles.find('.collapse-close').click(function(e) {
          e.stopPropagation();
          closeCollapsible($(this).closest('.collapse-content'));
        });
      }
    }

    // triggers functionality.
    var $triggers = $('[winestyle-collapse]', context);
    if ($triggers.length) {
      $tggers.click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var $this = $(this);
        var mobileOnly = $this.attr('collapse-mobile');
        if (typeof mobileOnly !== typeof undefined && mobileOnly !== false) {
          if (getWindowWidth() > 991) {
            return false;
          }
        }
        var mobileOnly = $this.attr('collapse-mobile-sm');
        if (typeof mobileOnly !== typeof undefined && mobileOnly !== false) {
          if (getWindowWidth() > 767) {
            return false;
          }
        }
        var collapseOptions = {};
        var attrString = $this.attr('winestyle-collapse').split(', ');
        attrString.forEach(function(attrString) {
          var tup = attrString.split(':');
          collapseOptions[tup[0]] = tup[1];
        });
        var collapseClass = typeof collapseOptions.class != 'undefined' ? collapseOptions.class : 'active';
        $this.toggleClass(collapseClass);
        if (typeof collapseOptions.text !== 'undefined') {
          var text = collapseOptions.text.split(',');
          var on = text[0];
          var off = text[1];

          if ($this.hasClass(collapseClass)) {
            $this.text(on);
          } else {
            $this.text(off);
          }
        }
        if (typeof collapseOptions.main != 'undefined') {
          val = collapseOptions.main;
        }
        if (typeof collapseOptions.el != 'undefined') {
          toggleCollapse($(collapseOptions.el), collapseOptions.time);
        } else {
          if (collapseOptions.target == "next-all") {
            toggleCollapse($this.nextAll(), collapseOptions.time);
          }
          if (collapseOptions.target == "next-all-parent") {
            toggleCollapse($this.parent().nextAll(), collapseOptions.time);
          } else {
            toggleCollapse($this.next(), collapseOptions.time);
          }
        }
      });
    }
  }

  /**
   * Hide popup
   * add close button to popup
   * ex: .popup a.popup-close
   * ex: .popup span[PROJECTNAME-popup-close]
   */
  PROJECTNAME.Behavior.hidePopup = function(settings) {
    var $popupClose = $('.popup .popup-close:not(.custom)', settings.context);
    $popupClose.add('.popup .[PROJECTNAME-popup-close]:not(.custom)', settings.context);
    if (settings.selector) $popupClose.add(settings.selector, settings.context);

    if ($popupClose.length) {
      var $popup = $('.popup');
      $popupClose.click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $popup.hide();
        $('body').removeClass('is-blocked');
      });

      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          $popup.hide();
          $('body').removeClass('is-blocked');
        }
      });
      $('body').on('click', '.popup .outer-click', function() {
        $popup.hide();
      });
    }
  }

  /**
   * Collapsible Text
   * ex: div[PROJECTNAME-trim-content="200" PROJECTNAME-trim-text="show more text"]
   */
  PROJECTNAME.Behavior.collapsibleText = function (settings) {
    var $collapsibleText = $('[PROJECTNAME-trim-content]', settings.context);

    if ($collapsibleText.length) {
      for (var i = 0, len = $collapsibleText.length; i < len; i++) {
        var $this = $collapsibleText.eq(i);
        var html = '<div class="text-block-collapsed hidden">' + $this.html() + '</div>';
        var trimsize = $this.attr('[PROJECTNAME-trim-content]') ? parseInt($this.attr('[PROJECTNAME-trim-content]')) : 256;
        var text = '<p class="text-block-visible">' + $this.text().trim().substr(0, trimsize) + '</p>';
        var link = '<span class="text-block-show">' + $this.attr('PROJECTNAME-trim-text') ? $this.attr('PROJECTNAME-trim-text') : 'show more' + '</span>';
        $this.html(text + link + html);
      }

      $('body').on('click', 'text-block-show', function() {
        var $this = $(this);
        $this.parent().addClass('is-opened');
        $this.parent().html($this.siblings('text-block-collapsed'));
      });
    }
  }

  /**
   * Five stars rating
   * add [PROJECTNAME-stars-rating] to star rating block
   * add .star to rating button
   */
  PROJECTNAME.Behavior.ratingStars = function (settings) {
    var $starsBlock = $('[PROJECTNAME-stars-rating]', settings.context);
    if (settings.selector) $starsBlock.add(settings.selector, settings.context);

    if ($starsBlock.length) {
      var $iconSingle = $icon.eq(j);
      var selectors = '[PROJECTNAME-stars-rating] .star'
      if (settings.selector) {
        selectors += ',' + settings.selector + ' .star';
      }
      $('body').on('mouseenter', selectors, function() {
        var $this = $(this);
        $this.addClass('icon-full').removeClass('icon-empty');
        $this.prevAll('.icon').addClass('icon-full').removeClass('icon-empty');
        $this.nextAll('.icon').addClass('icon-empty').removeClass('icon-full');
      });

      $('body').on('mouseleave', selectors, function() {
        var $this = $(this);
        $this.find('.icon').removeClass('icon-full icon-empty');
      });
    }
  }

  /**
   * Fix width or height.
   * [PROJECTNAME-fix-size] behavior.
   */
  PROJECTNAME.Behavior.fixSize = function(settings) {
    var $fixSizeCols = $('[PROJECTNAME-fix-size]', settings.context);
    if ($fixSizeCols.length) {
      var $this = $();
      window.fixSizerows = [];
      var k = -1;

      function getFixedLength(v, ind, rowsLength) {
        if (!$fixSizeCols.eq(v).length) {
          return 0;
        }
        var $ot = $fixSizeCols.eq(v).offset().top;
        var $next = $fixSizeCols.eq(v + 1);

        if (typeof ind == 'undefined') {
          ind = 1;
        }

        if (typeof fixSizerows[rowsLength] == 'undefined') {
          fixSizerows[rowsLength] = [];
        }

        if (!$next.length) {
          var rL = fixSizerows[rowsLength];
          if (rL[rL.length - 1] && rL[rL.length - 1].index() != $fixSizeCols.eq(v).index()) {
              rL[rL.length] = $fixSizeCols.eq(v);
          }
          return 0;
        }
        if ($next.length) {
          if ($next.offset().top == $ot) {
            if (ind == 1) {
                fixSizerows[rowsLength][0] = $fixSizeCols.eq(v);
            }

            fixSizerows[rowsLength][ind] = $next;
            v = getFixedLength(v + 1, ind + 1, rowsLength);
          } else {
            if (ind == 1 && v == 0) {
              fixSizerows[rowsLength][ind] = $next;
              return getFixedLength(v + 1, ind, rowsLength);
            }
          }
        }

        return v;
      }

      function getMax(arr) {
        var max = arr[0];
        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max
      }

      function setHeight() {
        for (var i = 0, len = fixSizerows.length; i < len; i++) {
          var row = fixSizerows[i];
          var heights = [];
          var widths = [];
          var heightmax = 0;
          var widthmax = 0;
          for (var j = 0, lenj = row.length; j < lenj; j++) {
            if ($(row[j]).attr('PROJECTNAME-fix-size') == 'width') {
              if ($(row[j]).is(":visible")) {
                $(row[j]).width('auto');
                widths[widths.length] = $(row[j]).width();
              }
            } else {
              heights[heights.length] = $(row[j]).height();
            }
          }
          heightmax = getMax(heights);
          widthmax = getMax(widths);
          var isMobile = getWindowWidth() < 767;
          for (var j = 0, lenj = row.length; j < lenj; j++) {
            if (typeof heightmax != 'undefined' && !isMobile) {
              $(row[j]).height(heightmax);
            }
            if (typeof widthmax != 'undefined') {
              $(row[j]).width(widthmax);
            }
          }
        }
      }
      function startFixed() {
        $fixSizeCols.css('height', 'auto');
        fixSizerows = [];
        k = -1;
        while (k != 0) {
            k = getFixedLength(k + 1, 1, fixSizerows.length);
        }
        setHeight();
      }
      // Check for height fixes on document ready.
      startFixed();
      $(window).resize(function() {
        if (getWindowWidth() > 767) {
          startFixed();
        }
      });
    }
  }

  /**
   * Scroll up button
   * ex: .button-up
   * ex: [PROJECTNAME-button-up]
   */
  PROJECTNAME.Behavior.scrollUp = function(settings) {
    var $btnUp = $('.button-up', settings.context);
    $btnUp.add('[PROJECTNAME-button-up]',settings.context);

    if ($btnUp.length) {
      $btnUp.click(function() {
        $("html, body").animate({
          scrollTop: 0
        }, 600);
        return false;
      });
      var btnT = $btnUp.offset().top;
      var btnL = $btnUp.offset().left;
      var fT = $('footer').offset().top;
      var wH = $(window).height();

      $(window).scroll(function () {
        var dT = $(document).scrollTop();
        if ((btnT - dT + 70) < wH) {
          $btnUp.addClass('fixed').css({
            bottom: 20,
            left: btnL
          });
          if ((dT + wH + 30) > fT) {
            $btnUp.css('bottom', (dT + wH + 70) - fT);
          }
        } else {
          $btnUp.removeClass('fixed');
        }
      });
    }
  }

  /**
   * Fancybox initialisation
   * ex. fancybox
   */
  PROJECTNAME.Behavior.fancyBoxInit = function(context) {
    var $fancybox = $('.fancybox', context);
    if ($fancybox.length) {
      $fancybox.fancybox({
        fitToView: false
      });
    }
  }

  /**
   * Change attribute on click.
   */
  PROJECTNAME.Behavior.attributeChange = function(settings) {
    var $attrTriggers = $('[PROJECTNAME-change-attr]', settings.context);
    if ($attrTriggers.length) {
      $attrTriggers.click(function(e) {
        var $this = $(this);
        var tabOptions = {};
        var attrString = $this.attr('PROJECTNAME-change-attr').split(', ');
        attrString.forEach(function(attrString) {
          var tup = attrString.split(':');
          tabOptions[tup[0]] = tup[1];
        });
        var el = tabOptions.el ? tabOptions.el : '';
        var $el = $(el);
        if ($el.length) {
          var attr = tabOptions.attr ? tabOptions.attr : 'text';
          var val = tabOptions.val ? tabOptions.val : '';
          $el.attr(attr, val);
        }
      });
    }
  }

  /**
   * Smart forms behaviors
   * TODO: вспомнить, что делает. добавить умные лейблы
   */
  PROJECTNAME.Behavior.smartForm = function(settings) {
    var $form = $('form', settings.context);
    $form.add('[PROJECTNAME-form]', settings.context);
    if (settings.selector) $form.add(settings.selector, settings.context);

    if ($form.length) {
      $('form input[type="text"],form input[type="email"],form input[type="password"], formtextarea', settings.context).keyup(function(e) {
        var $this = $(this);
        if ($this.val().length) {
          $this.removeClass('error');
          if ($this.closest('form').hasClass('form-validate')) {
            if (!$this.next().hasClass('input-label-name')) {
              var lbl = '<span class="input-label-name">' + $this.attr('placeholder') + '</span>';
              $(lbl).insertAfter($this);
            }
          }
        } else {
          $this.next('.input-label-name').remove();
        }
      });
    }
  }

  /**
   * Imagefill library
   */
  PROJECTNAME.Behavior.imageFillBg = function(settings) {
    var $imageContainers = $('.imagefill', settings.context);
    $imageContainers.add('[PROJECTNAME-imagefill]', settings.context);
    if (settings.selector) $imageContainers.add(settings.selector, settings.context);

    if ($imageContainers.length) {
      $imageContainers.imagefill();
    }
  }

})(jQuery)
