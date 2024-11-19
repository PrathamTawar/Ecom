async function getSite() {
    let data = await fetch('./frontend/Home/home.html')
    data = await data.text()

    console.log(data.data)

    document.querySelector('html').innerHTML = data
    console.log(document.querySelector('html'))
    
}

getSite()