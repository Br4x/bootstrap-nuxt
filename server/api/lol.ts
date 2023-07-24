/* eslint-disable no-console */
import { access, readdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import type { PathLike } from 'node:fs'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const city = await readBody(event)

  try {
    const files = await readdir('../../../../bootstrap-vue/src/components')
    for (const file of files)
      console.log(file)
  }
  catch (err) {
    console.error(err)
  }

  // if (await checkFileExists(`data/cities/${city.Burg}.json`)) {
  //  const tmp = await readFile('data/cities_full.json', 'utf8')
  //  const full = JSON.parse(tmp)
//
  //  await writeFile('data/cities_full.json', JSON.stringify(full))
  // }
})

function checkFileExists(file: PathLike) {
  return access(file, constants.F_OK)
    .then(() => true)
    .catch(() => false)
}
