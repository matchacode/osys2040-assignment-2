nst PostgresUtil = require('../utils/PostgresUtil')

async function createLikesTable() {
  return await PostgresUtil.pool.query(`CREATE TABLE likes (
    message_id  INTEGER,
    created_by  VARCHAR(200)
  )`)
}

async function createLikes(message_id, created_by) {
  try {
    const result = await PostgresUtil.pool.query(
      'INSERT INTO likes (message_id, created_by) VALUES ($1, $2);',
      [
        message_id, created_by
      ])

    return result
  } catch (exception) {
    if (exception.code === '42P01') {
      // 42P01 - table is missing - we'll create it and try again
      await createLikesTable()
      return createLikesTable(handle, data)
    } else {
      // unrecognized, throw error to caller
      console.error(exception)
      throw exception
    }
  }
}

async function getLikes() {
  try {
    const result = await PostgresUtil.pool.query(
      'SELECT * FROM likes')

    return result.rows
  } catch (exception) {
    if (exception.code === '42P01') {
      // 42P01 - table is missing - we'll create it and try again
      await createMessageTable()
      return getLikes()
    } else {
      // unrecognized, throw error to caller
      console.error(exception)
      throw exception
    }
  }
}

module.exports = {
  createLikes: createLikes,
  createLikesTable: createLikesTable,
  getLikes: getLikes,
}
