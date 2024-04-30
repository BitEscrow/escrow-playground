import { useClient }   from '@/hooks/useClient'
import { useFeeRates } from '@scrow/hooks'

import { Dispatch, SetStateAction, useState } from 'react'

import { Box, Code, Group, NumberInput, Slider, Text } from '@mantine/core'

interface Props {
  feerate : number
  setRate : Dispatch<SetStateAction<number>>
  txsize ?: number
}

export default function ({ feerate, setRate, txsize } : Props) {
  const { client }            = useClient()
  const { data , isLoading }  = useFeeRates(client)
  const [ slider, setSlider ] = useState(1)

  const update_fee = (e : number) => {
    if (data !== undefined) {
      const count = (e < 20) ? 1 : Math.floor(e / 10)
      setRate(data[String(count)])
    }
  }

  return (
    <Box>
      <NumberInput
        mt={25}
        value={feerate}
        onChange={(e) => setRate(Number(e))}
        min={1}
        max={1000}
        suffix=" sats/vbyte"
      />
      { !isLoading && data &&
        <Slider
          m={10}
          p={20}
          label="Confirmation Target"
          value={slider}
          onChange={setSlider}
          onChangeEnd={(e) => update_fee(e)}
          min={1}
          marks={[
            { value: 1,   label : 'Next Block' },
            { value: 30,  label : '3 Blocks'   },
            { value: 60,  label : '6 Blocks'   },
            { value: 100, label : '10 Blocks'  }
          ]}
        />
      }
      { txsize && 
        <Group mt={30}>
          <Text fw={700} size='sm'>Fee Total:</Text>
          <Code>{feerate * txsize} sats</Code>
        </Group>
      }
    </Box>
  )
}

