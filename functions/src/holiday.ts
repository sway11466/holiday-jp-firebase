import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {HolidayJPCondition, useHolidayJP} from "@sway11466/holiday-jp-npm";

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

  // create iso string on jst
  const fillYear = String(cond.year);
  const fillMonth = String(cond.month).padStart(2, "0");
  const fillDay = String(cond.day).padStart(2, "0");
  const isoString = `${fillYear}-${fillMonth}-${fillDay}T00:00:00+09:00`;

  // response
  const status = holyday.length > 0 ? 200 : 404;
  const payload = {
    "holiday": (holyday.length > 0),
    "year": cond.year,
    "month": cond.month,
    "date": cond.day,
    "name": (holyday.length > 0) ? holyday[0].name : "",
    "iso-date": isoString,
  };

  response.status(status).send(JSON.stringify(payload));
});
