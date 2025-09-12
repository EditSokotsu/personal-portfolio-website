const sidebar = document.querySelector('#navbar #sidebar');
const respMenu = document.querySelector('#navbar li.resp-menu');

function showSidebar() {
    sidebar.style.display = 'flex';
    respMenu.style.display = 'none';
}

function hideSidebar() {
    sidebar.style.display = 'none';
    respMenu.style.display = 'inline-block';
}