module.exports = (next) => {
  const checker = (api, event, command) => {
    const expression = new RegExp(command.format);
    if (expression.test(event.body) && command.type.includes(event.type)) {
      next(api, event, expression);
      return true;
    }
    return false;
  };
  return checker;
};
