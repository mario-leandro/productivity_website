import * as fs from "fs";
import * as path from "path";

class Logger {
  private logDir: string = path.join(__dirname, "logs");
  private logFile: string = path.join(this.logDir, `log_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`);

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  public info(mensagem: string): void {
    this.escreverLog("INFO", mensagem);
  }

  public error(mensagem: string): void {
    this.escreverLog("ERRO", mensagem);
  }

  private escreverLog(nivel: string, mensagem: string): void {
    const timestamp = new Date().toISOString();
    const linhaLog = `[${timestamp}] [${nivel}]: ${mensagem}\n`;

    fs.appendFileSync(this.logFile, linhaLog, "utf8");

    console.log(linhaLog.trim());
  }
}

export const logger = new Logger();