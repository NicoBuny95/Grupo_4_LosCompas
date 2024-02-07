function toggleUserOptions() {
    var userActions = document.querySelector('.user-actions');
    userActions.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    var userInfo = document.querySelector('.user-info');
    userInfo.addEventListener('click', toggleUserOptions);
});
