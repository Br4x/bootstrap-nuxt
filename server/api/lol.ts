/* eslint-disable no-console */
import type { PathLike } from 'node:fs'
import { access, constants, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'

export default defineEventHandler(async () => {
  try {
    const path = '../bootstrap-vue/src/components/'
    const dirs = await readdir(path)

    for (const dir of dirs) {
      console.log(dir)
      let doc = ''
      const components: Object[] = []
      const tests: Object[] = []

      const files = await readdir(path + dir)
      const storyName = toPascalCase(dir)

      files.forEach((file) => {
        const filePath = `${path + dir}/${file}`
        if (file === 'README.md')
          doc = filePath
        else if (file !== 'index.js' && file.endsWith('.js') && !file.endsWith('.spec.js'))
          components.push({ path: filePath, name: toPascalCase(file) })
        else if (file.endsWith('.spec.js'))
          tests.push({ path: filePath, name: file.replace('.spec.js', '') })
      })

      // tests.forEach(async (test) => {
      //  // console.log(test)
      //
      //  if (!await checkFileExists(`../nuxt-starter/tests/unit/components/${test.name}.test.ts`)) {
      //    console.log(test.path, test.name, `tests/units/components/${test.name}.test.ts`)
      //    let content = await readFile(test.path, 'utf8')
      //
      //    // clean import and add vitest impprt
      //    content = content.replace(/import { (?<compName>[A-Za-z-]*) } from '\.\/([A-Za-z-]*)'/gm, `import { describe, expect, it } from 'vitest'
      //    import B${toPascalCase(test.name)} from '@/components/B/${toPascalCase(test.name)}.vue'`)
      //
      //    // remove useless wrapper destroy
      //    content = content.replace(/wrapper\.destroy\(\)/gm, '')
      //
      //    // remove useless waitNt and waitraf
      //    content = content.replace(/import { waitNT, waitRAF } from '\.\.\/\.\.\/\.\.\/tests\/utils'/gm, '')
      //
      //    // remove useless waitNt and waitraf
      //    content = content.replace(/await waitNT\(wrapper\.vm\)/gm, 'await wrapper.vm.$nextTick()')
      //
      //    // remove useless waitNt and waitraf
      //    content = content.replace(/await waitRAF\(\)/gm, 'await new Promise(resolve => requestAnimationFrame(resolve))')
      //
      //    // remove classes length test as we add it more with nano
      //    content = content.replace(/expect\(header\.classes\(\)\.length\)\.toBe\([0-9]*\)/gm, '')
      //
      //    await writeFile(`../nuxt-starter/tests/unit/components/${test.name}.test.ts`, content)
      //  }
      // })
      let content = ''

      if (doc) {
        content = await readFile(doc, 'utf8')
      }
      else {
        console.log(doc)
        console.log(`fail ${storyName}`)
      }

      if (!await checkFileExists(`../nuxt-starter/stories/components/${storyName}/${storyName}.stories.ts`)) {
        console.log(storyName)
        let compNames: any[] = []
        const stories: string[] = []

        // split by # to get all big block
        const matches = [...content.matchAll(/(?<=\# )(.*?)(?=\# |<!-- Component reference)/gms)]
        matches.forEach((match) => {
          // get variant name
          const variantName = toPascalCase(match[1].match(/^.*$/m)[0])

          // get code block
          const mts = [...match[1].matchAll(/(?<=```html)(.*?)(?=```)/gms)]

          let i = 0

          mts.forEach((block) => {
            let template = ''
            let script = ''

            if (block[0].includes('<template>')) {
              const lol = block[0].match(/(?<=<template>)(.*?)(?=<\/template>)/gms)
              const lol2 = block[0].match(/(?<=export default {)(.*?)(?=<\/script>)/gms)
              if (lol)
                template = lol[0]
              if (lol2)
                script = `${lol2[0].replace(/\r?\n?[^\r\n]*$/, '').replace(/\r?\n?[^\r\n]*$/, '')},`
            }
            else {
              template = block[0]
            }

            const usedComp = [...block[0].matchAll(/<b-([a-z-]*)/gm)]
            const compi: string[] = []
            usedComp.forEach((comp) => {
              compi.push(toPascalCase(`${comp[0]}`))
            })
            compNames = [...compNames, ...compi]

            stories.push(`export const ${variantName}${i > 0 ? i : ''}: Story = {
              render: (args, { argTypes }) => ({
                components: { ${compi.filter((value, index, array) => {
                  return array.indexOf(value) === index
                    }).join(',')} },
                props: Object.keys(argTypes),
                template: \`${template.replaceAll('`', '\\`').replaceAll('${', '\${')}\`,
                ${script}
                setup() {
                  return { args }
                },
                args: {
                  show: true,
                },
              }),
            }`)
            content = content.replace(`\`\`\`html${block[0]}\`\`\``, `<Canvas of={${storyName}Story.${variantName}${i > 0 ? i : ''}} />`)
            i++
          })
        })
        const header = `import type { Meta, StoryObj } from '@storybook/vue3'
          import vitestResults from '@/tests/unit/results.json'
          ${compNames.filter((value, index, array) => {
          return array.indexOf(value) === index
            }).map((comp) => {
              return `import ${comp} from '@/components/B/${comp.substring(1)}.vue'`
            }).join('\r\n')
          }
          
          const meta = {
            title: 'Components/${storyName}',
            component: B${storyName},
            parameters: {
              vitest: {
                testFile: '${dir}.test.tsx',
                testResults: vitestResults,
              },
            },
            argTypes: {
              
            },
          } satisfies Meta<typeof B${storyName}>
          
          export default meta
          type Story = StoryObj<typeof meta>`

        const storyContent = `
          ${header}

          ${stories.join('\r\n\r\n')}
          `

        const docContent = `
import { Canvas, Meta } from '@storybook/blocks';
import * as ${storyName}Story from './${storyName}.stories';

<Meta of={${storyName}Story} />

${content.replace('<!-- Component reference added automatically from component package.json -->', '')}`
        await mkdir(`../nuxt-starter/stories/components/${storyName}/`)
        await writeFile(`../nuxt-starter/stories/components/${storyName}/${storyName}.stories.ts`, storyContent)
        await writeFile(`../nuxt-starter/stories/components/${storyName}/${storyName}.mdx`, docContent)
      }
    }
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
    .catch((error) => {
      console.log(file)
      console.error(error)
    })
}

function toPascalCase(string: any) {
  return `${string}`
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(
      /\s+(.)(\w*)/g,
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`,
    )
    .replace(/\w/, s => s.toUpperCase())
}
