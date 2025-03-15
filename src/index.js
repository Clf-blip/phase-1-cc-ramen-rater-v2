// index.js

// Handle ramen click event
const handleClick = (ramen) => {
  const detailImage = document.querySelector(".detail-image");
  const name = document.querySelector(".name");
  const restaurant = document.querySelector(".restaurant");
  const rating = document.querySelector("#rating-display");
  const comment = document.querySelector("#comment-display");

  if (detailImage && name && restaurant && rating && comment) {
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    name.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    rating.textContent = ramen.rating;
    comment.textContent = ramen.comment;
  }
};

// Add submit listener to form
const addSubmitListener = () => {
  const form = document.querySelector("#new-ramen");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const ramenMenu = document.querySelector("#ramen-menu");
    if (!ramenMenu) return;

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target["new-comment"].value,
    };

    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));

    ramenMenu.appendChild(img);
    form.reset();
  });
};

// Fetch and display ramen images
const displayRamens = async () => {
  try {
    const response = await fetch("http://localhost:3000/ramens");
    if (!response.ok) throw new Error("Network response was not ok");
    
    const ramens = await response.json();
    const ramenMenu = document.querySelector("#ramen-menu");
    if (!ramenMenu) return;

    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching ramen data:", error);
  }
};

// Initialize application
const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};