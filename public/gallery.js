const requestData = () => {
  fetch("http://localhost:5000/image-data")
    .then((data) => data.json())

    .then((data) => {
      const car = document.getElementById("CarsImages");

      data.forEach((element) => {
        const carDiv = document.createElement("div");
        const carImg = document.createElement("img");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => deleteImage(element.image));
        car.appendChild(deleteBtn);

        carImg.src = "http://localhost:5000/PhotoGallery/" + element.image;
        carDiv.appendChild(carImg);

        const carCaption = document.createElement("h3");
        carCaption.innerText = element.caption;
        carDiv.appendChild(carCaption);

        car.appendChild(carDiv);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

requestData();

const deleteImage = (image) => {
  if (confirm("are you sure you want to delete this Image?")) {
    fetch(`http://localhost:5000/delete/${image}`, { method: "delete" })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
      });
  }
};
