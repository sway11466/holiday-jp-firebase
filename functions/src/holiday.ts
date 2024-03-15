import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {HolidayJPCondition, useHolidayJP} from "@sway11466/holiday-jp-npm";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const holiday = onRequest((request, response) => {
  logger.info("[holiday] called.", {structuredData: true});

  // create date as jst
  const jstDate = request.query.date ?
    new Date(request.query.date as string) :
    new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000);

  // validate date
  if (isNaN(jstDate.getDate())) {
    response.status(400).send("bad date format.");
  }

  // get holiday
  const holidayjp = useHolidayJP();
  const cond: HolidayJPCondition = {
    year: jstDate.getFullYear(),
    month: jstDate.getMonth() + 1,
    day: jstDate.getDate(),
  };
  const holyday = holidayjp.get(cond);

  // response
  const status = holyday.length > 0 ? 200 : 404;
  const payload = {
    "holiday": (holyday.length > 0),
    "year": cond.year,
    "month": cond.month,
    "date": cond.day,
    "name": (holyday.length > 0) ? holyday[0].name : "",
  };

  response.status(status).send(JSON.stringify(payload));
});
