import npath from 'path';

import { compileString } from 'sass';

const { Buffer } = globalThis;

const defaults = { loadPaths: [] };

const getRelative = url => npath.relative('.', url.pathname);

export default async ({ file: { buffer, links, path }, options }) => {
  options = { ...defaults, ...options };
  const { css, loadedUrls } = compileString(buffer.toString() || '\n', {
    ...options,
    loadPaths: options.loadPaths.concat(npath.dirname(path))
  });
  return {
    buffer: Buffer.from(css),
    links: links.concat(loadedUrls.map(getRelative))
  };
};
