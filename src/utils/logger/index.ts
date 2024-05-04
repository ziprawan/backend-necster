function getDate(): string {
  const now = new Date();

  const dateString = now.toISOString();

  return dateString;
}

class Logger {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  info(...msg: any[]): void {
    console.info(`[${getDate()} INFO ${this.name}] ${msg.join(" ")}`);
  }

  err(...msg: any[]): void {
    console.info(`[${getDate()} ERROR ${this.name}] ${msg.join(" ")}`);
  }

  warn(...msg: any[]): void {
    console.info(`[${getDate()} WARN ${this.name}] ${msg.join(" ")}`);
  }

  debug(...msg: any[]): void {
    console.info(`[${getDate()} DEBUG ${this.name}] ${msg.join(" ")}`);
  }

  fatal(...msg: any[]): void {
    console.trace(`[${getDate()} FATAL ${this.name}] ${msg.join(" ")}`);
  }
}

export { getDate, Logger };
