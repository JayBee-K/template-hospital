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
			}).one('select2:open', function(e) {
				$('input.select2-search__field').prop('placeholder', $(this).attr('data-placeholder-search'));
			});
		})
	}
}

const handleInitDateRangePicker = function () {
	let format = 'DD-MM-YYYY';
	let timePicker = false;
	let timePicker24Hour = false;
	let timePickerSeconds = false;
	let timePickerIncrement = 5; // step minute
	$('.initDateRangePicker').each(function () {
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
	handleCopyValue();
	handleViewPass();
	handleInitSelect2();
	handleInitDateRangePicker();
});
