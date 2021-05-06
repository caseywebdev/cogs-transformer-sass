import npath from 'path';
import { promisify } from 'util';

import sass from 'sass';

const render = promisify(sass.render);

const DEFAULTS = {
  includePaths: [],
  indentedSyntax: false
};

const getRelative = path => npath.relative('.', path);

export default async ({ file: { buffer, links, path }, options }) => {
  options = { ...DEFAULTS, ...options };
  const { css, stats } = await render({
    ...options,
    data: buffer.toString() || '\n',
    includePaths: options.includePaths.concat(npath.dirname(path))
  });
  return {
    buffer: Buffer.from(css),
    links: links.concat(stats.includedFiles.map(getRelative))
  };
};
