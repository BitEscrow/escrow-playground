import { Container }  from '@mantine/core';

import Hero   from "./sections/hero";
import Docs   from './sections/docs';
// import CTA from './sections/cta';

export default function () {
  return (
    <Container>
      <Hero />
      <div style={{backgroundColor: '#f2f2f2', borderRadius: '25px'}}>
        <Docs/> 
      </div>
      {/* <CTA/> */}
    </Container>
  )
}