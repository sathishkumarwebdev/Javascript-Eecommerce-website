const container = document.getElementById("container");
const box = document.createElement("div");
box.setAttribute("class", "box");
const smallImg = document.createElement("div");
smallImg.setAttribute("id", "small-img");
const bigImg = document.createElement("div");
bigImg.setAttribute("class", "big-img");
const productDetailsDiv = document.createElement("div");
productDetailsDiv.setAttribute("class", "product-deatil");

const bigimgdiv = document.createElement("div");
bigimgdiv.setAttribute("id", "bigimgdiv");
bigimgdiv.setAttribute("class", "mag");

const bigimg = document.createElement("IMG");

async function redirect() {
  const searchParams = new URLSearchParams(window.location.search);
  const newId = searchParams.get("newId");
  const response = await fetch("https://dummyjson.com/products/" + newId);
  const data = await response.json();
  // console.log(data);
  const srcDb = data.thumbnail;
  const title = data.title;
  const id = data.id;
  const description = data.description;
  const price = data.price;
  const discountPercentage = data.discountPercentage;
  const rating = data.rating;
  const stock = data.stock;
  const brand = data.brand;
  const category = data.category;
  const images = data.images;

  display(
    srcDb,
    title,
    id,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    images
  );

  const divclick = document.querySelectorAll("#small-img > *");

  for (let i = 0; i < images.length; i++) {
    divclick[i].addEventListener("mouseover", function () {
      const srcimg = images[i];
      bigimgdiv.innerHTML = "<img src=" + srcimg + " height='auto'>";
    });
  }
  // for (let i = 0; i < images.length; i++) {
  //   divclick[i].addEventListener("click", function () {
  //     const srcimg = images[i];
  //     bigimgdiv.innerHTML = "<img src=" + srcimg + " height='auto'>";
  //   });
  // }
}

redirect();
function display(
  srcDb,
  title,
  id,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  images
) {
  //small-Image
  for (let i = 0; i < images.length; i++) {
    const div = document.createElement("div");
    const getId = "div" + i;
    div.setAttribute("id", getId);
    const imgData = images[i];
    const img = document.createElement("IMG");
    img.setAttribute("src", imgData);
    div.appendChild(img);

    smallImg.appendChild(div);
    box.appendChild(smallImg);
  }

  //big image

  bigimg.setAttribute("src", srcDb);
  bigimgdiv.appendChild(bigimg);
  bigImg.appendChild(bigimgdiv);
  box.appendChild(bigImg);

  //content
  const productDiv = document.createElement("div");
  const productDec = document.createElement("div");
  const productTitle = document.createElement("h1");
  productTitle.setAttribute("class", "content-style");
  productTitle.innerText = brand + " " + title;
  productDec.appendChild(productTitle);
  productDiv.appendChild(productDec);
  productDetailsDiv.appendChild(productDiv);
  box.appendChild(productDetailsDiv);

  //rating
  let ratingDiv = document.createElement("div");

  const floor = Math.floor(rating);
  const ratingValue = document.createElement("span");
  ratingValue.innerText = rating + " ";
  ratingDiv.appendChild(ratingValue);

  for (let i = 0; i < floor; i++) {
    const ratingTag = document.createElement("span");
    ratingTag.setAttribute("class", "fa fa-star checked");
    ratingDiv.appendChild(ratingTag);
    productDetailsDiv.appendChild(ratingDiv);
    box.appendChild(productDetailsDiv);
  }
  for (let i = 0; i < 5 - floor; i++) {
    const ratingTag = document.createElement("span");

    ratingTag.setAttribute("class", "fa fa-star");

    ratingDiv.appendChild(ratingTag);
    productDetailsDiv.appendChild(ratingDiv);
    box.appendChild(productDetailsDiv);
  }
  const hr = document.createElement("hr");
  ratingDiv.appendChild(hr);
  productDetailsDiv.appendChild(ratingDiv);
  box.appendChild(productDetailsDiv);

  //price and discount
  const priceDiv = document.createElement("div");
  priceDiv.setAttribute("class", "price-div");
  const afterDis = discountPrice(price, discountPercentage);
  const h = document.createElement("span");
  h.innerText = "-" + discountPercentage + "%";
  h.setAttribute("class", "discount");
  const pricetag = document.createElement("span");
  pricetag.innerText = " " + "$" + afterDis;
  priceDiv.appendChild(h);
  priceDiv.appendChild(pricetag);
  const priceValue = document.createElement("h3");
  priceValue.innerText = "M.R.P.:" + "$";
  const spanTag = document.createElement("span");
  spanTag.setAttribute("class", "strike");
  spanTag.innerText = price;
  priceValue.appendChild(spanTag);
  priceDiv.appendChild(priceValue);
  const hrTag = document.createElement("hr");
  priceDiv.appendChild(hrTag);
  productDetailsDiv.appendChild(priceDiv);

  box.appendChild(productDetailsDiv);

  const allDetail = document.createElement("div");
  allDetail.setAttribute("class", "all-deatil");
  const boldDiv = document.createElement("div");
  const nDiv = document.createElement("div");
  nDiv.setAttribute("class", "n-div");
  const hbrand = document.createElement("p");
  const htitle = document.createElement("p");
  const hstock = document.createElement("p");
  const pbrand = document.createElement("p");
  const ptitle = document.createElement("p");
  const pstock = document.createElement("p");

  hbrand.innerText = "Brand:";
  htitle.innerText = "Title:";
  hstock.innerText = "Stock:";

  pbrand.innerText = brand;
  ptitle.innerText = title;
  pstock.innerText = stock;

  boldDiv.appendChild(hbrand);
  boldDiv.appendChild(htitle);
  boldDiv.appendChild(hstock);
  nDiv.appendChild(pbrand);
  nDiv.appendChild(ptitle);
  nDiv.appendChild(pstock);
  const hrLine = document.createElement("hr");
  allDetail.appendChild(boldDiv);
  allDetail.appendChild(nDiv);

  productDetailsDiv.appendChild(allDetail);
  productDetailsDiv.appendChild(hrLine);
  box.appendChild(productDetailsDiv);

  const decriptionDiv = document.createElement("div");
  const about = document.createElement("h3");
  about.innerText = "About this item ";
  const aboutDecs = document.createElement("p");
  aboutDecs.innerText = description;

  decriptionDiv.appendChild(about);
  decriptionDiv.appendChild(aboutDecs);
  productDetailsDiv.appendChild(decriptionDiv);

  container.appendChild(box);
}
function discountPrice(price, discountPercentage) {
  const discountValue = price * ((100 - discountPercentage) / 100);
  const value = discountValue.toFixed(2);

  return value;
}
