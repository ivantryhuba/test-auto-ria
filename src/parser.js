const parser = testUrl => {
  const url = new URL(testUrl);

  const params = {};

  if (!validURL(url)) {
    throw new Error('Invalid URL');
  }

  url.searchParams.forEach((value, name) => {
    if (!value) {
      return;
    }

    const isDot = name.indexOf('.');

    if (isDot === -1) {
      if (value[0] === '"' && value[value.length - 1] === '"') {
        return (params[name] = value.replace(/['"]+/g, ''));
      }

      if (!isNaN(+value)) {
        return (params[name] = Number(value));
      }

      if (value === 'true') {
        return (params[name] = true);
      }

      if (value === 'false') {
        return (params[name] = false);
      }

      return (params[name] = value);
    }

    const obj = name.split('.');

    if (value[0] === '"' && value[value.length - 1] === '"') {
      return (params[obj[0]] = {
        ...params[obj[0]],
        [obj[1]]: value.replace(/['"]+/g, ''),
      });
    }

    if (!isNaN(+value)) {
      return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: Number(value) });
    }
    if (value === 'true') {
      return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: true });
    }

    if (value === 'false') {
      return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: false });
    }

    return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: value });
  });

  console.log('Params =', JSON.stringify(params, null, 2));

  return Object.keys(params)[0] ? params : null;
};

function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(str);
}

module.exports = parser;
