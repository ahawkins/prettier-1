import { join } from 'path'

import { shuffle } from 'lodash'
import prettier, { Options } from 'prettier'
import PkgPlugin from 'prettier-plugin-pkg'

import pkg1 from './fixtures/fixture1.json'
import pkg2 from './fixtures/fixture2.json'

const pkgs = [pkg1, pkg2]

const createFixture = (index: 0 | 1 = 0) => {
  const pkg = pkgs[index]
  return shuffle(Object.keys(pkg)).reduce(
    (acc, key: keyof typeof pkg) =>
      Object.assign(acc, {
        [key]: pkg[key],
      }),
    {} as typeof pkg,
  )
}

const JSON_STRINGIFY = 'json-stringify'

test('randomize', () => {
  const input = JSON.stringify(createFixture(), null, 2)
  const output = prettier.format(input, {
    filepath: join(__dirname, 'package.json'),
    parser: JSON_STRINGIFY,
    plugins: [PkgPlugin],
  })

  expect(output).toMatchSnapshot()
})

test('preprocess', () => {
  const input = JSON.stringify(createFixture(1), null, 2)
  const output = prettier.format(input, {
    filepath: join('package.json'),
    parser: JSON_STRINGIFY,
    plugins: [PkgPlugin],
    preprocess(content: string) {
      const { version, repository }: typeof pkg1 = JSON.parse(content)
      return { repository, version }
    },
  } as Options)

  expect(output).toMatchSnapshot()
})

test('not package.json', () => {
  const fixture = { version: 'batman', name: 'joker' }
  const input = JSON.stringify(fixture, null, 2)
  const output = prettier.format(input, {
    filepath: 'batman.json',
    parser: JSON_STRINGIFY,
    plugins: [PkgPlugin],
  })

  expect(input.trim()).toBe(output.trim())
})

test('broken json', () => {
  const broken = `{
  "name": "prettier-plugin-pkg",
  "batman": {]
}`

  expect(() =>
    prettier.format(broken, {
      filepath: 'broken.json',
      parser: JSON_STRINGIFY,
      plugins: [PkgPlugin],
    }),
  ).toThrow()
})
