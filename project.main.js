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
      var footerHeight = 0,
        bodyHeight = 0,
        vwptHeight = 0,
        wrapperHeight = 0,
        $body = $('body'),
        $mainwrapper = $('.main-wrapper');

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
      var $mainContent = $('.main-content'),
        $body = $('body');
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
        var $this = $(this),
          $dDContainer = $this.parent();
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


})(jQuery)
