const verifySlash = (path: string) => {
  if (path.endsWith("/")) {
    return path;
  } else {
    return path + "/";
  }
};

export default verifySlash;
