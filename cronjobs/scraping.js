const axios = require("axios");
const indeed = require("indeed-job-scraper");
const cron = require("node-cron");
const Indeedmodel = require("./../model/indeedMode");
cron.schedule("*/1 * * * *", async () => {
  try {
    const queryOptions = {
      query: "Nodejs Devloper",
      level: "senior_level",
    };
    const results = await indeed.getJobsList(queryOptions);
    console.log(results);
    if (results.length === 0) {
      console.log("No job found");
    } 
    const jobs = results
      .filter((result) => {
        // Filter out results with missing or undefined properties
        return (
          result.title &&
          result.company &&
          result.location &&
          result.description &&
          result.url
        );
      })
      .map((result) => {
        return {
          title: result.title,
          company: result.company,
          location: result.location,
          description: result.description,
          url: result.url,
        };
      });
    // Save job listings to the database
    //await Indeedmodel.insertMany(jobs);
    console.log(jobs);
  } catch (error) {
    console.log("Error occured scrapping", error);
  }
});
