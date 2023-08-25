import fetch from "node-fetch";
import fs from "fs";

const url_to_scrape =
  "https://www.sreality.cz/api/en/v2/estates?category_main_cb=1&category_type_cb=1&page=1&per_page=500";

const estates = [];

const scrape = async () => {
  const response = await fetch(url_to_scrape);
  const data = await response.json();

  data._embedded.estates.forEach((estate) => {
    estates.push({
      name: estate.name,
      image: estate._links.images[0].href,
    });
  });
};

scrape().then(() => {
  fs.writeFile("data.json", JSON.stringify(estates), (err) => {
    if (err) {
      console.error(err);
    }
  });
});
