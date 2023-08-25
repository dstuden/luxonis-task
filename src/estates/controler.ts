import { parse } from "url";

import { routerInstance } from "../utils/router";
import { client } from "../utils/pb";

const router = routerInstance;

router.get("/estates", async (req, res) => {
  try {
    const query = parse(req.url, true).query;

    if (!query || !query.page) {
      res.send([]).status(200);
      return;
    }

    const page = parseInt(query.page as string) - 1;

    const query_res = await client.query(
      "SELECT * FROM estates LIMIT 10 OFFSET $1",
      [page * 10]
    );

    if (query_res.rows.length === 0) {
      res.send([]).status(200);
      return;
    }

    res.send(query_res.rows).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
