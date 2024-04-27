
let mainContainer = document.querySelector(".main-container");
let searchCagetory = document.querySelector("#category")
let shortPrice = document.querySelector(".short-low-high")

// Fetch data from api
let arrData = []
const getData = async (URL) =>{
    let res = await fetch(URL)
    let data =await  res.json();
    arrData.push(data);
    showData(data)

}

const showData = (arr) => {
    mainContainer.innerHTML = ""
  arr.forEach((elem, i) => {
    let card = document.createElement("div")
    let image = document.createElement("img")
    image.src = elem.image;
    let title = document.createElement("h4")
    title.innerHTML = elem.title;
    let price = document.createElement("p")
    price.innerHTML = `<strong>Price:</strong> ${elem.price}`
    let category = document.createElement("p")
    category.innerHTML = `<strong>Cate:</strong> ${elem.category}`;
    
    let rating = document.createElement("p")
    rating.innerHTML = `Rating: ✨${elem.rating.rate}`
    let count = document.createElement("p")
    count.innerHTML = `(${elem.rating.count})`
    let ratCount = document.createElement("div")
    ratCount.append(rating, count)
    ratCount.classList.add("rating-div")
    
    let disc = document.createElement("p")
    disc.innerHTML = `${elem.description.substring(0, 60)}...`;

    card.append(image, title, price, category, ratCount,disc)
    mainContainer.append(card)
  })
}

// Search By Category Logic here
const searchByCategory = (elm) => {
    // console.log(arrData[0])
    let catVal = elm.target.value
    let shortData = []
    arrData[0].filter((elem) => {
        if(elem.category == catVal) {
            shortData.push(elem)
        }
    })
    showData(shortData)
}

searchCagetory.addEventListener("change", (elm) => {
    searchByCategory( elm)
   
})


// Search By Low High Price
const searchByLowHigh = (elm) => {
//    console.log()
let sortVal = elm.target.value;

if (sortVal == "hightolow"){
   arrData[0]= arrData[0].sort((a, b) => b.price - a.price )
    showData(arrData[0])
}

if (sortVal == "lowtohigh") {
     arrData[0] = arrData[0].sort((a, b) =>  a.price - b.price)
    showData(arrData[0])
}

}

shortPrice.addEventListener("change", (elm) => {
    searchByLowHigh( elm)
})




getData("https://fakestoreapi.com/products")