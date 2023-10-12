const nodeFetch = require('node-fetch')
module.exports = postPoolTableBooked = async (req, res, next) => {
  console.log('post "pool-table-booked" route hit')
  try {
    const url = `https://api.sheetson.com/v2/sheets/pool`
    const response = await nodeFetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SHEETSON_API_KEY || ''}`,
        'X-Sheetson-Spreadsheet-Id': process.env.SHEET_ID || '',
      },
      body: JSON.stringify({
        inUse: 'FALSE',
      }),
    })
    const json = await response.text()

    console.log(json)

    res.send({ json })
    // return json.results || error
  } catch (e) {
    console.log(e)
    return { error: JSON.stringify(e) }
  }
}
