/* eslint-disable @typescript-eslint/no-type-alias, sonarjs/no-duplicate-string */
type _ArrayExpression = import('@babel/types').ArrayExpression
type _ObjectExpression = import('@babel/types').ObjectExpression
type _ObjectProperty = import('@babel/types').ObjectProperty

export type StringLiteral = import('@babel/types').StringLiteral

export interface ObjectProperty extends _ObjectProperty {
  key: {
    value: string
  }
  value: ArrayExpression | ObjectExpression
}

export interface ObjectExpression extends _ObjectExpression {
  properties: ObjectProperty[]
}

export interface ArrayExpression extends _ArrayExpression {
  elements: Array<ArrayExpression | ObjectExpression | StringLiteral>
}

export interface StringMapProperty extends ObjectProperty {
  key: {
    value: string
  }
  value: StringMapExpression
}

export interface StringMapExpression extends ObjectExpression {
  properties: StringMapProperty[]
}

export interface StringArrayProperty extends ObjectProperty {
  key: {
    value: string
  }
  value: StringArrayExpression
}

export interface StringArrayExpression extends ArrayExpression {
  elements: StringLiteral[]
}
