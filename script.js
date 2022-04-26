
if (localStorage.getItem('theme') == 'dark')
    setDarkMode()

function setDarkMode() {
    let emoticon = ''
    let isDark = document.body.classList.toggle('dark')

    if (isDark) {
        emoticon = '<i class="bi bi-brightness-high"></i>'
        localStorage.setItem('theme', 'dark');
    } else {
        emoticon = '<i class="bi bi-moon"></i>'
        localStorage.removeItem('theme');
    }
    document.getElementById('darkBtn').innerHTML = emoticon
}

