const renderError = (err) => {
	const body = document.querySelector('body');

	const errBox = document.createElement('div');
	errBox.classList.add('border', 'error');

	errBox.innerHTML = `<p class="small">${err}</p>`;
	body.appendChild(errBox);
};
