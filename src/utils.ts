
import * as symbols from './symbols';


export interface LangMap {
  [key: string]: string | true,
  golang: string,
  typescript: string,
  java: string,
  swift: string
}

export const setTypeMap = function(v: LangMap) : LangMap{
  (v as any)[symbols.typeMap] = true; // TODO
  return v;
};


abstract class LangHelper {
  abstract createString(s: string): string
}

export class JavaLangHelper extends LangHelper {
  createString(s: string){
    return `"${s}"`;
  }
}

const classes = {
  java: new JavaLangHelper()
};


