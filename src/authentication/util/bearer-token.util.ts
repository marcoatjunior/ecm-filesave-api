export const extraiBearerToken = (req): string => {
  const authorization = req.headers?.authorization;
  if (!!authorization) {
    return authorization.split(' ')[1];
  }
  return null;
};
