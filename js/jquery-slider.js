(function ($) {
	$.fn.slider = function (options) {
		var element = $(this);

		function slider_size () {
			return element.parent().width();
		};

		function scroll_size () {
			var items = element.children();
			var child = (items.size() > 0) ? items.eq(1) : items.eq(0); /* prevent custom margin for the first element */
			return (child.outerWidth() + parseInt(child.css('marginLeft')) + parseInt(child.css('marginRight'))) * items.size();
		};

		function current_position () {
			return (parseInt(element.css('left')) * -1) || 0;
		};

		function scroll_remain () {
			return scroll_size() - slider_size() + (current_position() * -1);
		};

		function scroll (position) {
			element.animate({ left: position }, options.duration || 500, 'swing', function () {
				if (current_position() == 0)
					disable_cursor(options.prev);
				else
					enable_cursor(options.prev);

				if (scroll_remain() == 0)
					disable_cursor(options.next);
				else
					enable_cursor(options.next);
			});
		};

		function slide_left () {
			scroll((current_position() > slider_size() ? current_position() - slider_size() : 0) * -1);
		};

		function slide_right () {
			scroll((scroll_remain() > slider_size() ? current_position() + slider_size() : current_position() + scroll_remain()) * -1);
		};

		function disable_cursor (cursor) {
			$(cursor).addClass(options.disabledClass);
		};

		function enable_cursor (cursor) {
			$(cursor).removeClass(options.disabledClass);
		};

		function mouse_over (cursor) {
			$(cursor).addClass(options.activedClass);
		};

		function mouse_out (cursor) {
			$(cursor).removeClass(options.activedClass);
		};

		element.css({ width: scroll_size() });

		$(options.prev).click(slide_left);
		$(options.next).click(slide_right);

		$(options.prev).mouseover(function () {
			mouse_over(options.prev);
		});
		$(options.prev).mouseout(function () {
			mouse_out(options.prev);
		});
		$(options.next).mouseover(function () {
			mouse_over(options.next);
		});
		$(options.next).mouseout(function () {
			mouse_out(options.next);
		});

		disable_cursor(options.prev);

	}
})(jQuery);