import npath from 'path';
import { promisify } from 'util';

import sass from 'node-sass';
import _ from 'underscore';

const render = promisify(sass.render);

const DEFAULTS = {
  includePaths: [],
  indentedSyntax: false
};

const getRelative = path => npath.relative('.', path);

export default async ({ file: { buffer, links, path }, options }) => {
  options = { ...DEFAULTS, ...options };
  try {
    const { css, stats } = await render({
      ...options,
      data: buffer.toString() || '\n',
      includePaths: options.includePaths.concat(npath.dirname(path))
    });
    return {
      buffer: Buffer.from(css),
      links: links.concat(_.map(stats.includedFiles, getRelative))
    };
  } catch (er) {
    throw _.extend(new Error(), er, {
      message: `${path}: line ${er.line}, column ${er.column}, ${er.message}`
    });
  }
};
