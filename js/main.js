const cats = [
  {
    name: "Cat",
    bio: "Cat is an English word.",
    thumb: "images/kitten1-thumb.jpeg",
    img: "images/kitten1.jpeg"
  },
  {
    name: "Mao",
    bio: "Mao is is a Cantonese word.",
    thumb: "images/kitten2-thumb.jpeg",
    img: "images/kitten2.jpeg"
  },
  {
    name: "Gato",
    bio: "Gato is a Spanish word",
    thumb: "images/kitten3-thumb.jpeg",
    img: "images/kitten3.jpeg"
  },
  {
    name: "Billi",
    bio: "Billi is a Hindi word.",
    thumb: "images/kitten4-thumb.jpeg",
    img: "images/kitten4.jpeg"
  },
  {
    name: "Chat",
    bio: "Chat is a French word.",
    thumb: "images/kitten5-thumb.jpeg",
    img: "images/kitten5.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Polish word.",
    thumb: "images/kitten6-thumb.jpeg",
    img: "images/kitten6.jpeg"
  },
  {
    name: "Kit",
    bio: "Kit is a Ukrainian word.",
    thumb: "images/kitten7-thumb.jpeg",
    img: "images/kitten7.jpeg"
  },
  {
    name: "Kot",
    bio: "Kot is a Russian word.",
    thumb: "images/kitten8-thumb.jpeg",
    img: "images/kitten8.jpeg"
  }
]


const catsRow = document.getElementById("catsRow")
const cards = [

]
if (catsRow) {
  for (const cat of cats) {
    console.log(cat.name)

    // creates card HTML template copying from HTML page and replacing content with values from the object
    const card = `
      <div class="col">
          <div class="card">
              <img src="${cat.thumb}" class="card-img-top" alt="Placeholder" data-fullimg="${cat.img}" data-bs-toggle="modal" data-bs-target="#exampleModal">  
              <div class="card-body">
                <h5 class="class.title">${cat.name}</h5>
                <p class="card-text">${cat.bio}</p>
                <a href="#" class="btn btn-light like" data-catname="${cat.name}" data-catbio="${cat.bio}" data-catthumb="${cat.thumb}" data-catfullimg="${cat.image}">Like</a>
              </div>
          </div>
      </div> <!--  col ends -->
    `
    // push each card template to the cards array
    cards.push(card)
  }
  catsRow.insertAdjacentHTML("afterbegin", cards.join(""))
}
// Selecting all the images
const cardImages = document.querySelectorAll(".card-img-top")

// Adding event listeners to multiple elements
for (const cardImage of cardImages) {
  cardImage.addEventListener("click", openModal)
}

function openModal () {
  console.log(this.getAttribute("src"))
  const fullImage = this.dataset.fullimg
  const modalBody = document.querySelector(".modal-body")

  modalBody.innerHTML = `<img src="${fullImage}" alt="placeholder">`
}

/*------------------------------------------------------------------------
                        Week 11 - Local Storage
-------------------------------------------------------------------------*/

let savedCats = localStorage.getItem("mycats")
  
// If savedCats is not set, then set it to empty array
if (!savedCats) {
  savedCats = [

  ]
  // Else savedCats is set then parse it to convert to the array
} else {
  savedCats = JSON.parse(savedCats)
}


const likeButtons = document.querySelectorAll(".like") 

// Checks if we have any like buttons in the array/page
if (likeButtons.length > 0 ) {

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", likeCat)
    for (savedCat of savedCats) {
      if (likeButton.dataset.catname == savedCat.name) {
        likeButton.classList.remove("btn-light")
        likeButton.classList.add("btn-danger")
        likeButton.textContent = "Liked"
      }
    }
  }

}

function likeCat (e) {

  e.preventDefault()

  const catName = this.dataset.catname
  const catBio = this.dataset.catbio
  const catThumb = this.dataset.catthumb
  const catFullImage = this.dataset.catfullimg

  const catInfo = {
    name: catName,
    bio: catBio,
    thumb: catThumb,
    img: catFullImage
  }
  // console.log(catInfo)

  // Run the function findCat with the catName parameter and save the return in catExist variable
  const catExist = findCat (catName) 

  if (catExist != null) {
    alert("This cat is already liked")
  } else {
    // Else the catExist is null
    // We push the catInfo to te savedCats array
    savedCats.push(catInfo)
    localStorage.setItem("mycats", JSON.stringify(savedCats))
    this.classList.remove("btn-light")
    this.classList.add("btn-danger")
    this.textContent = "Liked"
  }
}

function findCat(catName) {
  
  for (savedCat of savedCats) {
    if (savedCat.name == catName) {
      return savedCats.indexOf(savedCat)
    }
  }
  return null
}

// Liked cats page

const likedCatsRow = document.getElementById("likedCatsRow")

if (likedCatsRow) {

  showLikedCats()

  function showLikedCats () {
    if (savedCats.length > 0) {
      let likedCards = [

      ]

      for (const cat of savedCats) {
        const card = `
        <div class="col">
            <div class="card">
                <img src="${cat.thumb}" class="card-img-top" alt="Placeholder" data-fullimg="${cat.img}" data-bs-toggle="modal" data-bs-target="#exampleModal">  
                <div class="card-body">
                  <h5 class="class.title">${cat.name}</h5>
                  <p class="card-text">${cat.bio}</p>
                  <a href="#" class="btn btn-light remove" data-catname="${cat.name}">Remove</a>
                </div>
            </div>
        </div> <!--  col ends -->
        `
        likedCards.push(card)
      }
      likedCatsRow.innerHTML = likedCards.join("")
    } else {
      likedCatsRow.innerHTML = "No liked cats to show"
    }
  }

  // Delegate event click to remove buttons
  likedCatsRow.addEventListener("click", removeCat)

  function removeCat (e) {
    if (e.target.classList.contains("remove")) {
      e.preventDefault()
      console.log(e.target.dataset.catname)
      
      const savedCatIndex = findCat(e.target.dataset.catname)

      savedCats.splice(savedCatIndex, 1)

      localStorage.setItem("mycats", JSON.stringify(savedCats))

      showLikedCats()
    }
  }

}

