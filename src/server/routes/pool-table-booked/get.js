module.exports = getPoolTableBooked = async (req, res, next) => {
  try {
    const url = `https://api.sheetson.com/v2/sheets/pool`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SHEETSON_API_KEY || ''}`,
        'X-Sheetson-Spreadsheet-Id': process.env.SHEET_ID || '',
      },
    })
    const json = await response.json()

    res.send({ json })
    // return json.results || error
  } catch (e) {
    return { error: JSON.stringify(e) }
  }
}