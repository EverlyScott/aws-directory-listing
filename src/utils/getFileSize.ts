const getFileSize = (bytes: number) => {
  // >1tb
  if (bytes >= 1000000000000) {
    const multiplied = bytes / 1000000000000;
    const rounded = Math.round(multiplied * 100) / 100;
    return `${rounded}TB`;
  }

  if (bytes >= 1000000000) {
    const multiplied = bytes / 1000000000;
    const rounded = Math.round(multiplied * 100) / 100;
    return `${rounded}GB`;
  }

  if (bytes >= 1000000) {
    const multiplied = bytes / 1000000;
    const rounded = Math.round(multiplied * 100) / 100;
    return `${rounded}MB`;
  }

  if (bytes >= 1000) {
    const multiplied = bytes / 1000;
    const rounded = Math.round(multiplied * 100) / 100;
    return `${rounded}KB`;
  }

  return `${bytes} Bytes`;
};

export default getFileSize;
