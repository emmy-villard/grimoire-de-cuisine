export function initImageInputs(fileInputId, urlInputId, clearBtnId) {
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(urlInputId);
    const clearBtn = clearBtnId ? document.getElementById(clearBtnId) : null;
    if (!fileInput || !urlInput) return;

    fileInput.multiple = false;

    const sync = () => {
        const hasFile = fileInput.files && fileInput.files.length > 0;
        urlInput.disabled = Boolean(hasFile);
    };

    const clearFile = () => {
        fileInput.value = '';
        sync();
    };

    fileInput.addEventListener('change', sync);
    urlInput.addEventListener('input', () => {
        if (urlInput.value.trim() !== '') {
            fileInput.value = '';
        }
        sync();
    });
    clearBtn?.addEventListener('click', clearFile);

    sync();
}
