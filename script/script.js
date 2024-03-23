const container = document.getElementById("container");

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
  category
) {
  // box-div
  let box = document.createElement("div");
  box.setAttribute("class", "box");
  box.setAttribute("id", id);
  //img creation
  let img = document.createElement("IMG");
  img.setAttribute("src", srcDb);
  img.setAttribute("width", "280");
  img.setAttribute("height", "300");
  img.setAttribute("alt", title);
  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "img-div");
  imgDiv.appendChild(img);
  box.appendChild(imgDiv);

  //title
  let titleTag = document.createElement("h2");
  titleTag.innerText = title;
  let titleDiv = document.createElement("div");
  titleDiv.appendChild(titleTag);
  box.appendChild(titleDiv);
  //brand
  let brandTag = document.createElement("h3");
  brandTag.innerText = brand;
  let brandDiv = document.createElement("div");
  brandDiv.appendChild(brandTag);
  box.appendChild(brandDiv);
  //decription
  let descriptionTag = document.createElement("p");
  descriptionTag.innerText = description;
  let descriptionDiv = document.createElement("div");
  descriptionDiv.appendChild(descriptionTag);
  box.appendChild(descriptionDiv);
  //price
  let priceDiv = document.createElement("div");

  let priceTag = document.createElement("p");
  priceTag.innerText = price + "$";

  priceDiv.appendChild(priceTag);
  box.appendChild(priceDiv);
  //rating;
  let ratingTag = document.createElement("p");
  ratingTag.innerText = rating;
  let ratingDiv = document.createElement("div");

  const floor = Math.floor(rating);

  for (let i = 0; i < floor; i++) {
    const ratingTag = document.createElement("span");
    ratingTag.setAttribute("class", "fa fa-star checked");
    const ratingData = ratingDiv.appendChild(ratingTag);
    box.appendChild(ratingData);
  }
  for (let i = 0; i < 5 - floor; i++) {
    const ratingTag = document.createElement("span");
    ratingTag.setAttribute("class", "fa fa-star");
    const ratingData = ratingDiv.appendChild(ratingTag);
    box.appendChild(ratingData);
  }

  //discount
  let discountPercentageTag = document.createElement("p");
  let discountname = "Discount:";
  discountPercentageTag.innerText = discountname + discountPercentage + "%";
  let discountPercentageDiv = document.createElement("div");
  discountPercentageDiv.appendChild(discountPercentageTag);
  box.appendChild(discountPercentageDiv);

  container.appendChild(box);
}

async function data() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const datadetails = await response.json();
    const data = datadetails.products;
    for (let i = 0; i <= data.length; i++) {
      const srcDb = data[i].thumbnail;
      const title = data[i].title;
      const id = data[i].id;
      const description = data[i].description;
      const price = data[i].price;
      const discountPercentage = data[i].discountPercentage;
      const rating = data[i].rating;
      const stock = data[i].stock;
      const brand = data[i].brand;
      const category = data[i].category;

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
        category
      );
      const divclick = document.querySelectorAll("#container > *");
      for (let i = 0; i < divclick.length; i++) {
        divclick[i].addEventListener("click", function () {
          const newId = divclick[i].id;
          window.location.href = "productDetails.html?newId=" + newId;

          // redirect(newId);
        });
      }
    }
  } catch (err) {
    return err;
  }
}
data();
