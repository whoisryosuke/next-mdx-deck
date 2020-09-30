#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs-extra')

// Create CLI instance
const cli = meow(
  `
  ${chalk.gray('Usage')}
    $ ${chalk.green('next-mdx-deck deck.mdx')}
    $ ${chalk.green('next-mdx-deck build deck.mdx')}
  ${chalk.gray('Options')}
      -p --port     Dev server port
`,
  {
    description: chalk.blue('next-mdx-deck'),
    flags: {
      port: {
        type: 'string',
        alias: 'p',
        default: '8000',
      },
    },
  }
)
/*
{
    input: ['develop', 'build'],
    flags: {port: '8000'},
}
*/

// Grab user input (MDX file) from CLI
const [cmd, file] = cli.input
const filename = file || cmd

// No file? Show the CLI help
if (!filename) cli.showHelp(0)

// Create spreadable object of flags passed (like port)
const opts = { ...cli.flags }

const copyAssetsFolder = async () => {
  const publicDir = path.join(__dirname, '../public')
  const distDir = path.join(process.cwd(), 'public')
  if (publicDir === distDir) return
  await fs.copySync(publicDir, distDir)
}

/**
 * Copies slides and runs Next CLI
 *
 * Clears /slides/ folder
 * Copies input file to /slides/
 * Copies over image assets
 * Runs Next CLI with passed args
 *
 * @param  {...any} args - Flags (like command or port)
 */
const next = async (...args) => {
  // Get slides directory
  const slidesDir = path.join(__dirname, '../slides')
  await fs.emptyDirSync(slidesDir)

  // Take MDX file from input and copy it into slides directory
  const mdxInputPath = `${process.cwd()}/${filename}`
  const newMdxFilePath = `${slidesDir}/${filename}`

  await fs.copy(mdxInputPath, newMdxFilePath, (err) => {
    if (err) return console.error(err)
  })

  // Copy contents of public folder (image assets and whatnot)
  // @TODO: Maybe pass Next CLI a flag for public dir?
  await copyAssetsFolder()

  // Run NextJS dev/build process
  return execa('next', args.filter(Boolean), {
    cwd: path.join(__dirname, '../'),
    stdio: 'inherit',
    preferLocal: true,
  })
}

switch (cmd) {
  case 'build':
    next('build').then(() => {
      const publicDir = path.join(__dirname, '../.next')
      const distDir = path.join(process.cwd(), '.next')
      if (publicDir === distDir) return
      fs.copySync(publicDir, distDir)
    })
    break
  case 'dev':
  default:
    next('dev', '-p', opts.port, opts.open && '--open')
    break
}
