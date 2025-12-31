function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) {
        existing.remove();
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    // trigger transition
    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });
    const hide = () => {
        toast.classList.remove('toast-visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    };
    setTimeout(hide, 3200);
}

export default showToast;
