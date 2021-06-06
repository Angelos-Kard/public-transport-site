//It checks if the user uses a mobile browser or not
function isItOnMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        return true;
    }
    else
    {
        return false;
    }
}