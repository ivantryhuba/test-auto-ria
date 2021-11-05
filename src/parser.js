const url = new URL(
  'http://myurl.com?foo.bar=42&foo.baz=hello&bar.baz=true&baz=11',
);

const parser = () => {
  const params = [];
  const objParams = {};
  // console.log('URL', url.searchParams);

  url.searchParams.forEach((value, name) => {
    const isDot = name.indexOf('.');
    // console.log('isDot', isDot);
    if (isDot===-1) {
      // console.log('name', name);
      // return params.push({ [name]: value });
      return (params[name] = value);
    }

    const obj = name.split('.');
    // console.log('obj', obj);
    return (params[obj[0]] = { [obj[1]]: value, ...params[obj[0]] });

    // return params.push({ [obj[0]]: { [obj[1]]: value } });

    // params[name] = value;
    params.push({ [name]: value });
  });
  console.log('Params', params);

  // params.reverse().forEach(elem => console.log({ ...objParams, ...elem }));
  // console.log(objParams)
};

module.exports = parser;

// const testUrl = 'http://myurl.com?foo.bar=42&foo.baz=hello&bar.baz=true&baz=11';

// const parser = () => {
//   // const obj = {};
//   const url = new URL(testUrl);
//   console.log(`Result ${url}`);

//   const urlParams = new URLSearchParams(url.search);
//   console.log('URL-params', urlParams);

//   const params = Object.fromEntries(urlParams.entries());
//   console.log('Params', params);

//   // const resultParse = JSON.stringify(Object.assign(params));

//   // console.log(`Result: ${resultParse}`);
//   // return obj;
// };

// // parser(testUrl);

// module.exports = parser;

// const url = new URL(testUrl);

// const urlBase = {
//   protocol: url.protocol,
//   hostname: url.hostname,
//   pathname: url.pathname,
// };

// const UrlParams = new URLSearchParams(url.search);
// const params = Object.fromEntries(UrlParams.entries());

// const resultParse = JSON.stringify(Object.assign(urlBase, params));

// console.log(resultParse);
