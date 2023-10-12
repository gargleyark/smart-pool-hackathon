var query = require('../../bin/database.js')

module.exports = putInOffice = async (context) => {
  const othersInOffice = await query(`SELECT * from in_the_office;`)

  if (othersInOffice.rows.length > 0) {
    return {
      matchedUser: othersInOffice.rows[0].slack_id,
    }
  } else {
    result = await query(
      `UPDATE users SET in_the_office = ${new Date().getTime()} WHERE slack_id = ${
        context.userId
      }`
    )
  }

  return { message: 'You are in the office and ready to play! G🎱🎱d luck!' }
}

// // context looks like:
// const contextExample = {
//     isEnterpriseInstall: false,
//     botToken: 'xoxb-6025375235029-6029227895314-1gOPQSzIDFU9bdw7bn35qoMi',
//     botUserId: 'U060V6PSB98',
//     botId: 'B0617RF9L6M',
//     userId: 'U060U8Y089Y',
//     teamId: 'T060RB16X0V',
//     retryNum: undefined,
//     retryReason: undefined,
//     updateConversation: [Function (anonymous)],
//     matches: [ 'in office', index: 0, input: 'in office', groups: undefined ]
// }
