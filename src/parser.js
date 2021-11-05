const url = new URL(
  "http://myurl.com?foo.bar=42&foo.baz=hello&bar.baz=true&baz=11"
);

const parser = () => {
  const params = {};

  url.searchParams.forEach((value, name) => {
    params[name] = value;
  });
  console.log(params);
};

module.exports = parser;
