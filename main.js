const apiKey = `fa80bc1d486a4ac3b407ca0ee368b453`
let COUNTRY = "us"
let CateGory = ""
let topButton = document.querySelectorAll(".menus button")
let newsList = []
let searchBar = document.getElementById("search-input")
let gumSax = document.getElementById("gumSax")
let hamBerger = document.getElementById("hamBerger")
let submenuBar = document.getElementById("submenuBar")
let exit = document.getElementById("X")
let subButton = document.querySelectorAll("#submenuButton button")
let url =  new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=${COUNTRY}&apiKey=${apiKey}`)
let E = document.getElementById("Error")

topButton.forEach((menu)=>
    menu.addEventListener("click",async (event)=>{
        if(event){
            CateGory = event.target.id
        }
        url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=${COUNTRY}&category=${CateGory}&apiKey=${apiKey}`)
        everyTime(url)
    }))

const getLatestNews = async()=>{ // async: 동기함수로 만들기 (await으로 기다리게 만들수 있음)

    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=${COUNTRY}&apiKey=${apiKey} `) // URL: 인스턴스, 미리 필요한걸 해주는거

    //https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${apiKey} 너무 많이 쓰다보니까 요구량이 너무 많다고 하면서 사용이 안되네요ㅠ
    everyTime(url)
}
const everyTime = async(url) => {

try {
    const response = await fetch(url)
    const data = await response.json()
    if(response.status===200){
        if(data.articles.length === 0){
            throw new Error("No matches for your search.")
        }
        newsList = data.articles
        render()

    }else{
        throw new Error(data.message)
    }
    } catch (error) {
        errorMessage(error.message)
    }
}
const getNewsByKeyWord = async() => {
        const keyword = document.getElementById("search-input").value
    console.log(keyword)
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=${COUNTRY}&q=${keyword}&apiKey=${apiKey}`)
    everyTime(url)
} 

const render = () =>{
    const newsHTML = newsList.map(news=>`<div class="row news">
        <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage} onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s';">
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${overTwoH(news)}</p>
        <div>${noSource(news)} * ${coolTime(news)}</div>
    </div>
    </div>`).join('')

    document.getElementById('news-board').innerHTML = newsHTML
}
const overTwoH = (news)=> {
    let arr = ""
    arr = news.description
    if(arr == null || arr == "[Removed]" || arr == ""){
        return arr = "내용없음"
    } else if (arr.length > 200){
        return arr.substring(0,200) + "..."
    } else{
        return arr
    }
}
const noSource= (news) =>{
    let arr1 = ""
    arr1 = news.source.name
    if(arr1.length <= 0){
        arr1 = "no source"
        return arr1
    } else{
        return arr1
    }
} 
const coolTime = (news) => {
    let date = moment(news.publishedAt.substring(0,10),"YYYYMMDD").fromNow()
    let hour = moment(news.publishedAt.substring(11,19),"h:mm:ss").fromNow()

    return date[0]+date[1] +"days  "+ hour
}
getLatestNews()


const OnOf= () => {
    if(searchBar.style.display == "inline"){
        searchBar.style.display = "none" 
        gumSax.style.display = "none" 
    } else{
        searchBar.style.display = "inline"
        gumSax.style.display = "inline"
    }
}
hamBerger.addEventListener("click",()=>submenuBar.style.left = "0%")
exit.addEventListener("click",()=>submenuBar.style.left = "-100%")


subButton.forEach((menu)=>
    menu.addEventListener("click",async (event)=>{
        if(event){
            CateGory = event.target.id
        }
        url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=${COUNTRY}&category=${CateGory}&apiKey=${apiKey}`)
        everyTime(url)
        submenuBar.style.left = "-100%"
    }))

const errorMessage = (error) =>{
    let errorHTML = `<div class="alert alert-danger" role="alert">
    ${error}
    </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}