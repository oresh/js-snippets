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
  PROJECTNAME.Behavior.stickyFooter = function(context, selector) {
    if (!context) context = document;
    var $stickyFooter = $('.sticky-footer', context);
    $stickyFooter.add('[PROJECTNAME-sticky-footer]');
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
  PROJECTNAME.Behavior.chosenSelect = function(context, selector) {
    var $select = $('.chosen-select', context);
    $select.add("[PROJECTNAME-chosen-select]", context);
    if (selector) $select.add(selector, context);

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
  PROJECTNAME.Behavior.popupShow = function(context, selector) {
    var $linkPopup = $('[PROJECTNAME-popup-block]',context);

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
  PROJECTNAME.Behavior.dropdownToggle = function(context, selector) {
    var $linkDropdown = $('.link-dropdown', context);
    $linkDropdown.add('[PROJECTNAME-link-dropdown]', context);

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


})(jQuery)
