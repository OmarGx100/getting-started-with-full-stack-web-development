const uuid = require("uuid");
const path = require("path");

const express = require("express");
const resData = require("../utils/restaurant-data");

const router = express.Router();

const restaurantFilePath = path.join(
  __dirname,
  "..",
  "data",
  "restaurants.json"
);

router.get("/restaurants", function (req, res) {
  const restaurants = resData.parseFileIntoJsObject(restaurantFilePath);
  const order = req.query.order;
  let nextOrder = 'desc';

  if(order ==='asc'){
    nextOrder = 'desc'
  }
  else {
    nextOrder = 'asc'
  }


  if (order == "asc") {
    restaurants.sort(function (resA, resB) {
      if (resA.name > resB.name) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (order == "desc") {
    restaurants.sort(function (resA, resB) {
      if (resA.name < resB.name) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  res.render("restaurants", {
    numberOfRestaurant: restaurants.length,
    restaurants: restaurants,
    nextOrder : nextOrder
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const restaurants = resData.parseFileIntoJsObject(restaurantFilePath);
  const resturant = restaurants.find((item) => item.id === restaurantId);
  if (resturant) {
    res.render("restaurant_detail", { resturant: resturant });
  } else {
    res.render("404");
  }
  return;
});

router.post("/user-data", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.parseFileIntoJsObject(restaurantFilePath);
  restaurants.push(restaurant);
  resData.rawTextFromJsObject(filePath, restaurants);
  res.redirect("/confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

module.exports = router;
