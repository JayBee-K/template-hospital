var windowWidth = document.documentElement.clientWidth;
window.addEventListener("resize", () => {
	windowWidth = document.documentElement.clientWidth;
});

let handleApplyCollapse = function ($parent, $firstItem = false, $callFunction = false) {
	let $childUl = $parent.find('> li > ul');
	if ($childUl.length === 0) {
		return;
	}

	if ($callFunction) {
		$parent.find('> li a').each(function () {
			$(this).attr('data-href', $(this).attr('href'))
		});
	}

	if (windowWidth <= 1536) {
		let $objParentAttr = {};
		let $objChildrenAttr = {
			'data-bs-parent': '#' + $parent.attr('id')
		}

		if ($firstItem) {
			let $parentID = 'menu-' + Math.random().toString(36).substring(7);
			$parent.attr('id', $parentID);
			$objParentAttr = {
				'data-bs-parent': '#' + $parentID
			}

			$objChildrenAttr = {};
		}

		$childUl.each(function () {
			let $parentUl = $(this).closest('ul');
			let $parentListItem = $(this).closest('li');
			let $parentListItemAnchor = $parentListItem.children('a');

			let $parentUlID = 'menu-' + Math.random().toString(36).substring(7);

			$parentUl.addClass('collapse').attr({
				'id': 'collapse-' + $parentUlID, ...$objParentAttr, ...$objChildrenAttr
			});

			$parentListItemAnchor.replaceWith(function () {
				return `<button aria-label="${$parentListItemAnchor.attr('aria-label')}" data-href="${$parentListItemAnchor.attr('data-href')}" data-bs-toggle="collapse" data-bs-target="#${$parentUl.attr('id')}">${$parentListItemAnchor.html()}</button>`
			})

			handleApplyCollapse($parentUl, false);

			$parentUl.on('show.bs.collapse', function () {
				$parent.find('.collapse.show').not($parentUl).collapse('hide');
			});
		});
	} else {
		$parent.removeAttr('id');

		$childUl.each(function () {
			let $parentUl = $(this).closest('ul');
			let $parentListItem = $(this).closest('li');

			$parentUl.removeClass('collapse').removeAttr('data-bs-parent id');
			$parentListItem.children('a').attr('href', $parentListItem.children('a').attr('data-href'));

			$parentListItem.children('button').replaceWith(function () {
				return `<a aria-label="${$(this).attr('aria-label')}" href="${$(this).attr('data-href')}" data-href="${$(this).attr('data-href')}">${$(this).html()}</a>`
			})

			handleApplyCollapse($parentUl);
		});
	}
}

let handleCallMenu = function () {
	const $body = $('body');
	const handleBody = function ($toggle = false) {
		if ($body.hasClass('is-navigation')) {
			$body.removeClass('is-navigation');
			if ($body.hasClass('is-overflow')) {
				$body.removeClass('is-overflow');
			}

			$('#header-navigation ul').collapse('hide');
		} else {
			if ($toggle) {
				$body.addClass('is-navigation is-overflow')
			}
		}
	}

	if (windowWidth <= 1536) {
		const $hamburger = $('#hamburger-button');
		if ($hamburger.length) {
			$hamburger.click(function () {
				handleBody(true)
			});
		}

		const $overlay = $('#header-overlay');
		if ($overlay.length) {
			$overlay.click(function () {
				handleBody();
			});
		}
	} else {
		handleBody();
	}
}

const handleCopyValue = function () {
	const copyButtons = document.querySelectorAll('.button-copy');
	if (copyButtons) {
		copyButtons.forEach(function (copyButton) {
			copyButton.addEventListener('click', function () {
				const valueToCopy = copyButton.getAttribute('data-value');

				const tempTextArea = document.createElement('textarea');
				tempTextArea.style.cssText = 'position: absolute; left: -99999px';
				tempTextArea.setAttribute("id", "textareaCopy");
				document.body.appendChild(tempTextArea);

				let textareaElm = document.getElementById('textareaCopy');
				textareaElm.value = valueToCopy;
				textareaElm.select();
				textareaElm.setSelectionRange(0, 99999);
				document.execCommand('copy');

				document.body.removeChild(textareaElm);

				if (copyButton.getAttribute('data-bs-toggle') === 'tooltip') {
					copyButton.setAttribute('title', 'Đã sao chép');

					const tooltip = bootstrap.Tooltip.getInstance(copyButton);
					tooltip.setContent({'.tooltip-inner': 'Đã sao chép'})
				}
			});
		})
	}
}

const handleViewPass = function () {
	$(document).on('click', '.buttonViewPassword', function () {
		let elm = $(this),
			elmID = elm.attr('data-id');
		if (elm.hasClass('is-show')) {
			elm.html('<i class="fal fa-eye">');
			elm.removeClass('is-show');
			$('#' + elmID).attr('type', 'password');
		} else {
			elm.html('<i class="fal fa-eye-slash">');
			elm.addClass('is-show');
			$('#' + elmID).attr('type', 'text');
		}
	});
}

const handleInitSelect2 = function () {
	if ($('.initSelect2').length) {
		$('.initSelect2').each(function () {
			let dropdownParent = $(this).parent();
			$(this).select2({
				language: 'vi',
				dropdownParent: dropdownParent,
				width: '100%',
			}).one('select2:open', function (e) {
				$('input.select2-search__field').prop('placeholder', $(this).attr('data-placeholder-search'));
			});
		})
	}
}

const handleInitDateRangePicker = function () {
	$('.initDateRangePicker').each(function () {
		let format = 'DD-MM-YYYY';
		let timePicker = false;
		let timePicker24Hour = false;
		let timePickerSeconds = false;
		let timePickerIncrement = 5; // step minute
		const wrapper = $(this).closest('.template-floating');
		let type = $(this).attr('data-type');
		if (typeof type != "undefined") {
			if (type === 'full') {
				format = 'DD-MM-YYYY HH:mm';
				timePicker = true;
				timePicker24Hour = true;
			} else if (type === 'time') {
				format = 'HH:mm';
				timePicker = true;
				timePicker24Hour = true;
			}
		}

		const initDateRangePicker = $(this).daterangepicker({
			singleDatePicker: true,
			alwaysShowCalendars: true,
			timePicker: timePicker,
			timePicker24Hour: timePicker24Hour,
			timePickerSeconds: timePickerSeconds,
			timePickerIncrement: timePickerIncrement,
			parentEl: wrapper,
			autoApply: true,
			locale: {
				format: format,
				daysOfWeek: [
					"CN",
					"T2",
					"T3",
					"T4",
					"T5",
					"T6",
					"T7"
				],
				monthNames: [
					"Tháng 1",
					"Tháng 2",
					"Tháng 3",
					"Tháng 4",
					"Tháng 5",
					"Tháng 6",
					"Tháng 7",
					"Tháng 8",
					"Tháng 9",
					"Tháng 10",
					"Tháng 11",
					"Tháng 12"
				],
				applyLabel: 'Áp dụng',
				cancelLabel: 'Đóng',
			}
		});

		if (typeof type != "undefined" && type === 'time') {
			initDateRangePicker.on('show.daterangepicker', function (ev, picker) {
				picker.container.find(".drp-calendar").addClass('px-3');
				picker.container.find(".calendar-table").hide();
			});
		}
	})
}

$(function () {
	handleApplyCollapse($('#header-navigation > ul'), true, true);
	handleCallMenu();
	$(window).resize(function () {
		handleApplyCollapse($('#header-navigation > ul'));
		handleCallMenu();
	})

	handleCopyValue();
	handleViewPass();
	handleInitSelect2();
	handleInitDateRangePicker();
});
