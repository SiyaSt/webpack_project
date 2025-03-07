type ClassNameArg = string | { [key: string]: boolean } | ClassNameArg[];

export const classNames = (...args: ClassNameArg[]): string => {
  const classes: string[] = [];

  const processArg = (arg: ClassNameArg): void => {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      if (Array.isArray(arg)) {
        arg.forEach(processArg);
      } else {
        for (const key in arg) {
          if (arg[key]) {
            classes.push(key);
          }
        }
      }
    } else if (arg) {
      classes.push(String(arg));
    }
  };

  args.forEach(processArg);

  return [...new Set(classes)].join(" ");
};
