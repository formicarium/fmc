import { HTTPVerb } from '~/modules/tracing/components/HTTP/Request';

export const colorForVerb: {[key: string]: string} = {
  [HTTPVerb.POST]: '#27ae60',
  [HTTPVerb.DELETE]: 'e74c3c',
  [HTTPVerb.HEAD]: '#8e44ad',
  [HTTPVerb.GET]: '#2980b9',
}

export const getFirstDigit = (status: number) => status.toString()[0]

export const statusColorTable: {[key: string ]: string} = {
  2: '#27ae60',
  3: '#2980b9',
  4: '#e74c3c',
  5: '#c0392b',
}
