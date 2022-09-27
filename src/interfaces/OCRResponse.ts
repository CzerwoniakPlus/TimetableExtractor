// To parse this data:
//
//   import { Convert, OCRResponse } from "./file";
//
//   const oCRResponse = Convert.toOCRResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface OCRResponse {
  status: string;
  createdDateTime: Date;
  lastUpdatedDateTime: Date;
  analyzeResult: AnalyzeResult;
}

export interface AnalyzeResult {
  version: string;
  modelVersion: Date;
  readResults: ReadResult[];
}

export interface ReadResult {
  page: number;
  angle: number;
  width: number;
  height: number;
  unit: string;
  language: string;
  lines: Line[];
}

export interface Line {
  boundingBox: number[];
  text: string;
  appearance: Appearance;
  words: Word[];
}

export interface Appearance {
  style: Style;
}

export interface Style {
  name: Name;
  confidence: number;
}

export enum Name {
  Other = 'other',
}

export interface Word {
  boundingBox: number[];
  text: string;
  confidence: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toOCRResponse(json: string): OCRResponse {
    return cast(JSON.parse(json), r('OCRResponse'));
  }

  public static oCRResponseToJson(value: OCRResponse): string {
    return JSON.stringify(uncast(value, r('OCRResponse')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ,
      )} but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  OCRResponse: o(
    [
      { json: 'status', js: 'status', typ: '' },
      { json: 'createdDateTime', js: 'createdDateTime', typ: Date },
      { json: 'lastUpdatedDateTime', js: 'lastUpdatedDateTime', typ: Date },
      { json: 'analyzeResult', js: 'analyzeResult', typ: r('AnalyzeResult') },
    ],
    false,
  ),
  AnalyzeResult: o(
    [
      { json: 'version', js: 'version', typ: '' },
      { json: 'modelVersion', js: 'modelVersion', typ: Date },
      { json: 'readResults', js: 'readResults', typ: a(r('ReadResult')) },
    ],
    false,
  ),
  ReadResult: o(
    [
      { json: 'page', js: 'page', typ: 0 },
      { json: 'angle', js: 'angle', typ: 0 },
      { json: 'width', js: 'width', typ: 3.14 },
      { json: 'height', js: 'height', typ: 3.14 },
      { json: 'unit', js: 'unit', typ: '' },
      { json: 'language', js: 'language', typ: '' },
      { json: 'lines', js: 'lines', typ: a(r('Line')) },
    ],
    false,
  ),
  Line: o(
    [
      { json: 'boundingBox', js: 'boundingBox', typ: a(3.14) },
      { json: 'text', js: 'text', typ: '' },
      { json: 'appearance', js: 'appearance', typ: r('Appearance') },
      { json: 'words', js: 'words', typ: a(r('Word')) },
    ],
    false,
  ),
  Appearance: o([{ json: 'style', js: 'style', typ: r('Style') }], false),
  Style: o(
    [
      { json: 'name', js: 'name', typ: r('Name') },
      { json: 'confidence', js: 'confidence', typ: 0 },
    ],
    false,
  ),
  Word: o(
    [
      { json: 'boundingBox', js: 'boundingBox', typ: a(3.14) },
      { json: 'text', js: 'text', typ: '' },
      { json: 'confidence', js: 'confidence', typ: 0 },
    ],
    false,
  ),
  Name: ['other'],
};
