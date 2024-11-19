async function getSite() {
    let data = await fetch('./frontend/Home/home.html')
    data = await data.text()
    document.querySelector('html').innerHTML = data
}
getSite()