
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
