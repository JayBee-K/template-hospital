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

$(function () {
	handleCopyValue();
	handleViewPass();
});
