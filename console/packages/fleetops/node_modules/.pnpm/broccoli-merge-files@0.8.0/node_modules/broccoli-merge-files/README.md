# broccoli-merge-files

[![Build Status](https://travis-ci.org/buschtoens/broccoli-merge-files.svg)](https://travis-ci.org/buschtoens/broccoli-merge-files)
[![npm version](https://badge.fury.io/js/broccoli-merge-files.svg)](http://badge.fury.io/js/broccoli-merge-files)
[![Download Total](https://img.shields.io/npm/dt/broccoli-merge-files.svg)](http://badge.fury.io/js/broccoli-merge-files)
[![Node.js Versions](https://img.shields.io/badge/Node.js%20Versions-%5E10.1.0-blue.svg?logo=Node.js)](https://travis-ci.org/buschtoens/broccoli-merge-files)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![dependencies](https://img.shields.io/david/buschtoens/broccoli-merge-files.svg)](https://david-dm.org/buschtoens/broccoli-merge-files)
[![devDependencies](https://img.shields.io/david/dev/buschtoens/broccoli-merge-files.svg)](https://david-dm.org/buschtoens/broccoli-merge-files)

Merge multiple trees of files into one or multiple files with a user-provided
merge function.

## Installation

```bash
yarn add -D broccoli-merge-files
```

## Usage

```ts
const { BroccoliMergeFiles } = require('broccoli-merge-files');

const mergedNode = new BroccoliMergeFiles(inputNodes, {
  merge: entries => JSON.stringify(Object.fromEntries(entries))
});
```

- **`inputNodes`**: An array of nodes, whose contents will be merged
- **`options`**: A hash of options

### Options

- **`outputFileName?: string`**: Optional output file name, if `merge` returns
  just the file singular file contents.
- **`async merge(files: [fileName, contents][])`**: Called with an array of all
  files to be merged.
  - If `outputFileName` is set, expected to return a `string` or `Buffer`.
  - If it is not set, expected to return an array or output files, like:
    `[fileName, contents][]`, where `fileName` is a `string` and `contents` is a
    `string` or `Buffer`.
- **`sort`**:
  - `true` _(default)_: Sort in order of input nodes and then relative file
    path.
  - `false`: Skip any sorting. Must not be used in conjunction with
    `DuplicateStrategy.KeepFirst` or `DuplicateStrategy.KeepLast`.
  - `(a: Entry, b: Entry) => number`: Compare function that gets
    passed two entries. Basically what you would pass to `[].sort()`.
- **`duplicates`**: If multiple input nodes contain a file with the same
  relative file path...
  - `'prohibit'` _(default)_: an error will be thrown and the pipeline crashes.
  - `'keep-first'`: the file from the first input node containing it is kept.
  - `'keep-last'`: the file from the last input node containing it is kept.
  - `'keep-all'`: all files will be passed through to `merge`.
- **`async transformFile?(path: string, contents: string | Buffer): any`**
  _(optional)_: Lets you transform every file before passing it to `merge`.
- **`patterns?: string | string[]`**: Glob patterns for
  [`fast-glob`](https://github.com/mrmlnc/fast-glob/#patterns).
- **`globOptions?: object`**: Glob options for
  [`fast-glob`](https://github.com/mrmlnc/fast-glob/#options-1).
- **`encoding?: string = 'utf8'`**: The encoding to use when reading and writing
  files.
- **`annotation?: string`**: A note to help tell multiple plugin instances apart.

## Related projects

- **[`broccoli-merge-trees`](https://github.com/broccolijs/broccoli-merge-trees)**
  — Copies multiple trees of files on top of each other, resulting in a single
  merged tree. Does not merge any individual files.
- **[`broccoli-flatiron`](https://github.com/buschtoens/broccoli-flatiron)**
  — Takes in a single input tree and merges all input files into a single JS
  module. Since this plugin is deprecated and not maintained any more,
  `broccoli-merge-files` includes a compatibility util to do the same thing:

  ```js
  const { BroccoliMergeFiles } = require('broccoli-merge-files');
  const flatiron = require('broccoli-merge-files/flatiron');

  new BroccoliMergeFiles([inputNode], {
    merge: files =>
      flatiron(files, {
        // trimExtensions: false,
        // prefix: 'export default ',
        // suffix: ';'
      }),
    outputFileName: 'files.js'
  });
  ```
