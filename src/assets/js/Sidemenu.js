document.getElementById("topnav-hamburger-icon")?.addEventListener("click", function () {
    if (document.getElementById('Id_hamburger')?.classList.contains('open')) {
        document.getElementById('Id_hamburger')?.classList.remove("open");
    } else {
        document.getElementById('Id_hamburger')?.classList.add("open");
    }
});