const parser = (testUrl) => {
  const url = new URL(testUrl);

  const params = {};

  if(!validURL(url)){
    throw new Error('Invalid URL')
  }

  url.searchParams.forEach((value, name) => {
    if (!value) {
      return;
    }

    const isDot = name.indexOf('.');

    if (isDot === -1) {
      if (value[0] === '"' && value[value.length - 1] === '"') {
        return (params[name] = String(value.replace(/['"]+/g, '')));
      }

      if (!isNaN(+value)) {
        return (params[name] = Number(value));
      }
      if (value === 'true' || value === 'false') {
        return (params[name] = Boolean(value));
      }

      return (params[name] = String(value));
    }

    const obj = name.split('.');

    if (value[0] === '"' && value[value.length - 1] === '"') {
      // console.log(1, String(value));
      return (params[obj[0]] = {
        ...params[obj[0]],
        [obj[1]]: String(value.replace(/['"]+/g, '')),
      });
    }

    if (!isNaN(+value)) {
      // console.log(2, Number(value));
      return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: Number(value) });
    }
    if (value === 'true' || value === 'false') {
      // console.log(Boolean(value), value);
      // console.log(3, Boolean(value));
      return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: Boolean(value) });
    }

    // console.log('obj', obj);
    return (params[obj[0]] = { ...params[obj[0]], [obj[1]]: value });
  });

  // console.log('Params', params);
  console.log(JSON.stringify(params));

  return Object.keys(params)[0] ? params : null
};

function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

module.exports = parser;
