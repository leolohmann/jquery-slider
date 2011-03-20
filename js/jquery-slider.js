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
					disable_cursor(options.left);
				else
					enable_cursor(options.left);

				if (scroll_remain() == 0)
					disable_cursor(options.right);
				else
					enable_cursor(options.right);
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
			$(cursor).addClass(options.activeClass);
		};

		function mouse_out (cursor) {
			$(cursor).removeClass(options.activeClass);
		};

		element.css({ width: scroll_size() });

		$(options.left).click(slide_left);
		$(options.right).click(slide_right);

		$(options.left).mouseover(function () {
			mouse_over(options.left);
		});
		$(options.left).mouseout(function () {
			mouse_out(options.left);
		});
		$(options.right).mouseover(function () {
			mouse_over(options.right);
		});
		$(options.right).mouseout(function () {
			mouse_out(options.right);
		});

		disable_cursor(options.left);

	}
})(jQuery);