class Pathname {
  path: string;

  constructor(path: string) {
    this.path = path
      .split("/")
      .filter((s) => s !== "")
      .join("/");
  }

  get isLastPath(): boolean {
    return this.nextPath ? false : true;
  }

  get currPath(): string {
    const splitted = this.path.split("/");
    return splitted[0] === "" ? "/" : splitted[0];
  }

  get nextPath(): string | null {
    const splitted = this.path.split("/");

    if (splitted.length <= 1) {
      // This is the last of pathname
      return null;
    } else {
      return splitted.slice(1).join("/");
    }
  }
}

export { Pathname };
