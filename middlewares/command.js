module.exports = (next) => {
  const checker = (api, event, command) => {
    console.log(command.format);
    console.log(event.body);
    const expression = new RegExp(command.format);
    if (expression.test(event.body) && command.type.includes(event.type)) {
      console.log(command.format);
      next(api, event, expression);
      return true;
    }
    return false;
  };
  return checker;
};
