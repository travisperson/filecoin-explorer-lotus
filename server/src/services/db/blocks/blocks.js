import { db } from '../'

export const getBlockById = async (id) => {
  const { rows } = await db.query(
    `
    SELECT
      block,
      parent,
      b.miner,
      b.height,
      b.timestamp

    FROM
      block_parents
    INNER JOIN
      blocks b on block_parents.block = b.cid

    WHERE
      block = $1`,
    [id],
  )

  if (!rows.length) return []
  return rows[0]
}

export const getBlockRange = async () => {
  const { rows } = await db.query(
    `
    SELECT
      MIN(height) AS "minHeight",
      MAX(height) AS "maxHeight"

    FROM
      blocks
    `,
    [],
  )

  if (!rows || !rows.length) {
    return {}
  }
  console.log('min block range is', rows[0])

  return rows[0]
}
