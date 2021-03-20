import { hello } from "."

it('should say Hello, World', () => {
  expect(hello()).toEqual('Hello, world!')
})
