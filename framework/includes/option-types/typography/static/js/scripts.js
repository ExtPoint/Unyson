/*global fw_typography_fonts */
( function ($) {
	$(document).ready(function () {
		var fonts = [];
		_.each(fw_typography_fonts['standard'], function (item) {
			fonts.push({
				text: item,
				value: item,
				optgroup: null
			});
		});
		_.each(fw_typography_fonts['google'], function (item) {
			fonts.push({
				text: item['family'],
				value: item['family'],
				optgroup: null
			});
		});

		fwEvents.on('fw:options:init', function (data) {
			setTimeout(function () {
				data.$elements.find('.fw-option-typography-option-family select[data-type="family"]:not(.initialized)').each(function () {

					new Selectize($(this), $.extend({}, $.fn.selectize.defaults, {

						render: {
							option: function (item) {
								if (fw_typography_fonts['google'].hasOwnProperty(item.value)) {
									var background = (typeof fw_typography_fonts['google'][item.value].position === "number") ? 'style="background-position: 0 -' + fw_typography_fonts['google'][item.value].position + 'px;' : 'style="background: none;';
									return '<div data-value="' + item.value + '" data-selectable="" class="option">' + item.text + '<div class="preview" ' + background + '"></div></div>';
								} else {
									return '<div data-value="' + item.value + '" data-selectable="" class="option">' + item.text + '<div class="preview" style="background: none; font-family: ' + item.value + '">' + item.value + '</div></div>';
								}
							}
						},
						onChange: function (selected) {
							var html = '';
							if (fw_typography_fonts['google'].hasOwnProperty(selected)) {
								var font = fw_typography_fonts['google'][selected];
								_.each(font.variants, function (variant) {
									html += '<option value="' + variant + '">' + fw.capitalizeFirstLetter(variant) + '</option>';
								});
							} else {
								html += '<option value="300">Thin</option><option value="300italic">Thin/Italic</option><option value="400" selected="selected">Normal</option><option value="italic">Italic</option><option value="700">Bold</option><option value="700italic">Bold/Italic</option>';
							}
							this.$dropdown.closest('.fw-option-typography-option-family').next('.fw-option-typography-option-style').find('select[data-type="style"]').html(html);
						},
						maxItems: 1,
						items: [$(this).attr('data-value')],
						options: fonts
					}));

					$(this).addClass('initialized');
				});
			}, 100);
		});
	});
}(jQuery));