import * as React from 'react'

// 1. import `ChakraProvider` component

import Navbar from "./component/Navbar";

export default function App() {
    // 2. Wrap ChakraProvider at the root of your app
    return (
      <>
          <Navbar />
      </>
    )
}