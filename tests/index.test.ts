import { describe, it, expect } from 'vitest'
import { hello } from '../src/index'

describe('hello', () => {
  it('should greet with name', () => {
    expect(hello('Guo')).toBe('Hello, Guo!')
  })
})
