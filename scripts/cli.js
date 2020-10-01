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
      -p --port     Dev server port (default: 8000)
      -config       Relative location to config file (default: deck.config.js)
`,
  {
    description: chalk.blue('next-mdx-deck'),
    flags: {
      port: {
        type: 'string',
        alias: 'p',
        default: '8000',
      },
      config: {
        type: 'string',
        alias: 'config',
        default: 'deck.config.js',
      },
    },
  }
)
/*
{
    input: ['develop', 'build'],
    flags: {port: '8000', config: 'deck.config.js' },
}
*/

// Grab user input (MDX file) from CLI
const [cmd, file] = cli.input
const filename = file || cmd

// No file? Show the CLI help
if (!filename) cli.showHelp(0)

// Add file to Node ENV for NextJS to use
process.env.MDXPath = process.cwd()
process.env.MDXSlideFile = filename

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
  // const slidesDir = path.join(__dirname, '../slides')

  // Take MDX file from input and copy it into slides directory
  // const mdxInputPath = `${process.cwd()}/${filename}`
  // const newMdxFilePath = `${slidesDir}/${filename}`
  // const mdxFileExists = await fs.pathExists(newMdxFilePath)

  // if (mdxInputPath !== newMdxFilePath && mdxFileExists) {
  //   // Delete old slides
  //   await fs.emptyDirSync(slidesDir)
  //   // Copy MDX file
  //   await fs.copy(mdxInputPath, newMdxFilePath, (err) => {
  //     if (err) return console.error(err)
  //   })
  // }

  // const oldConfigPath = path.join(__dirname, '../deck.config.js')
  // const inputFilename = opts.config ? opts.config : 'deck.config.js'
  // const inputConfigPath = `${process.cwd()}/${inputFilename}`
  // const inputConfigExists = await fs.pathExists(inputConfigPath)
  // // Delete old config and copy
  // if (oldConfigPath !== inputConfigPath && inputConfigExists) {
  //   await fs.remove(oldConfigPath)
  //   await fs.copy(inputConfigPath, oldConfigPath, (err) => {
  //     if (err) return console.error(err)
  //   })
  // }

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
    next('dev', '-p', opts.port)
    break
}
