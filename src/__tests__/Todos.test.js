import React from 'react'
import { render, act } from '@testing-library/react'
import axios from 'axios'
import Todos from '../Components/Todos'

// Like Jest has expect, RTL has 'it'
it('Renders todos', async () => {
  // We'll need to store something in a variable called component later, so we'll go ahead and declare it first
    let component;
  
    // Cover Header.test.js first

    // We use the spyOn method of Jest to mock a function
      // My reference https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname

    // jest, itself, is a global object that is automatically in scope with every test file created
      // We don't need to import it
    // We implement mockImplementation in order to utilize axios and its method that was used in the spyOn method
    // More on mock functions at https://jestjs.io/docs/en/mock-function-api.html
    jest.spyOn(axios, 'get').mockImplementation(() =>
      Promise.resolve({
        // dummy data we create
        data: [{ id: 1, title: 'test title' }],
      })
    )
  
    // To prepare a component for assertions, wrap the code rendering it and performing updates inside an act() call.
      // act comes to us from React's testing utilities 
    await act(async () => {
      const { container } = render(<Todos />)
      component = container;
      // Grabs the dom container from the Todos component and reassigns it to the component variable
    })
  
    expect(component.textContent).toContain('test title')
  })