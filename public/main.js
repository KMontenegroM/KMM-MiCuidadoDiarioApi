const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/": "/pages/home.html",
    "/register": "/pages/register.html",
    "/login": "/pages/login.html",
    "/checkList": "/pages/checkList.html",
    "/record": "/pages/record.html",
    "/checkListEA": "/pages/checkListEA.html",
    "/checkListHC": "/pages/checkListHC.html",
    "/returnCheckListPA": "/pages/returnCheckListPA.html",
    "/returnCheckListEA": "/pages/returnCheckListEA.html",
    "/returnCheckListHC": "/pages/returnCheckListHC.html",
    "/404": "/pages/404.html",
    "/500": "/pages/500.html",
    "/404PA": "/pages/404PA.html"
    
};


const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();