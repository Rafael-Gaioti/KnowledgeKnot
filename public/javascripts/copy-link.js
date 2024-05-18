document.getElementById('shareButton').addEventListener('click', async function() {
    try {
        urlToCopy = window.location.href;
        await navigator.clipboard.writeText(urlToCopy);

        const copyMessage = document.getElementById('copyMessage')
        copyMessage.classList.add('show')
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, 3000);
    } catch {
        const copyErrorMessage = document.getElementById('copyErrorMessage');
        copyErrorMessage.classList.add('show');
        setTimeout(() => {
            copyErrorMessage.classList.remove('show');
        }, 3000);

    }
})


