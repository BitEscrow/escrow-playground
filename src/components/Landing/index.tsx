import { Container }  from '@mantine/core';

import Hero   from "./hero";
import Docs   from './docs';

export default function () {
  return (
    <Container>
      <Hero />
      <div style={{backgroundColor: '#f2f2f2', borderRadius: '25px'}}>
        <Docs/> 
      </div>
    </Container>
  )
}