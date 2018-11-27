

export interface ILang {
 lang: string
}

export class Lang {

  conf: ILang;

  constructor(v: ILang) {
    this.conf = Object.assign({}, v);
  }
  
}
