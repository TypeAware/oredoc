

export interface ILang {
 lang: string
}

export class Lang implements  ILang{

  lang: string;

  constructor(v: ILang) {

    for(let k of Object.keys(v)){
      (this as any)[k] = (v as any)[k];
    }

  }


}
