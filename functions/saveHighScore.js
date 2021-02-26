require("dotenv").config();
const Airtable = require("airtable");
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = require("airtable").base(process.env.AIRTABLE_BASE);
const table = base(process.env.AIRTABLE_TABLE);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "HTTP method not allowed" }),
    };
  }

  const { score, name } = JSON.parse(event.body);

  if (!score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "BAD REQUEST" }),
    };
  }

  try {
    const records = await table
      .select({
        sort: [{ field: "score", direction: "desc" }],
      })
      .firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
    const lowestRecord = formattedRecords[8];
    if (
      typeof lowestRecord.fields.score === "undefined" ||
      score > lowestRecord.fields.score
    ) {
      const updatedRecord = {
        id: lowestRecord.id,
        fields: {
          name,
          score,
        },
      };
      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ err: "Failed to update record in  airtable" }),
    };
  }
};
