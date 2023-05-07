const parseUrl = (url: string) => {
  const arrUrl = url.split('/');
  const baseUrl = arrUrl.slice(0, 3).join('/');
  const id = arrUrl[arrUrl.length - 1];

  return { baseUrl, id };
};

const isUuidCorrect = (id: string) => {
  const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

  return v4.test(id);
};

export { parseUrl, isUuidCorrect };
