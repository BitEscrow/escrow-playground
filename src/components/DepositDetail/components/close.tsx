import { useState }    from 'react'
import { DepositData } from '@scrow/sdk/core'
import { useSigner }   from '@/hooks/useSigner'
import { useFeeRates } from '@scrow/hooks'
import { useClient }   from '@/hooks/useClient'

import { Box, Button, NumberInput, Slider, Text } from '@mantine/core'
import { assert } from '@scrow/sdk/util'

interface Props {
  data   : DepositData
  opened : boolean
}

export default function ({ data, opened } : Props) {
  const { client } = useClient()
  const { signer } = useSigner()

  const { data : fees, isLoading } = useFeeRates(client, !opened)

  const [ slider, setSlider   ] = useState(1)
  const [ feerate, setFeerate ] = useState(1)

  const close = async () => {
    assert.exists(signer)
    const fee = feerate * 65
    const req = signer.deposit.close(data, fee)
    const res = await client.deposit.close(req)
    if (!res.ok) throw new Error(res.error)
  }

  const update_fee = (e : number) => {
    if (fees !== undefined) {
      const count = (e < 20) ? 1 : Math.floor(e / 10)
      setFeerate(fees[String(count)])
    }
  }

  return (
    <>
      { isLoading && <></> }
      { !isLoading && fees !== undefined &&
        <Box mt={10}>
          <Text c={'dimmed'}>Select a fee-rate for your closing transaction:</Text>
          <Slider
            m={10}
            p={20}
            label="Fee Target"
            value={slider}
            onChange={setSlider}
            onChangeEnd={(e) => update_fee(e)}
            marks={[
              { value: 1,   label : 'Next Block' },
              { value: 30,  label : '3 Blocks'   },
              { value: 60,  label : '6 Blocks'   },
              { value: 100, label : '10 Blocks'  }
            ]}
          />
          <NumberInput
            mt={25}
            value={feerate}
            onChange={(e) => setFeerate(Number(e))}
            min={1}
            max={1000}
            suffix=" sats per vbyte"
          />
          <Text mt={10}>TxFee Total: {feerate * 65} sats</Text>
          <Button
            mt={10}
            w='80px'
            onClick={close}
            style={{
              borderRadius: '15px',
              backgroundColor: '#0068FD',
            }}
          >
            Confirm
          </Button>
        </Box>
      }
    </>
  )
}
