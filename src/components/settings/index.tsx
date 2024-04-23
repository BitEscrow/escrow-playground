import { useState }  from 'react'
import { Network }   from '@scrow/sdk/core'
import { useConfig } from '@/hooks/useConfig'
import { useClient } from '@/hooks/useClient'
import { useSigner } from '@/hooks/useSigner'

import CONFIG from '@/config/index.js'

import {
  Card,
  Group,
  Text,
  Title,
  Divider,
  NativeSelect,
  Box,
  Button,
  Space
} from '@mantine/core'

import {
  ToastContainer,
  toast,
  Slide
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function SettingsView () {

  const { store, update : update_config } = useConfig()
  const { update : update_client } = useClient()
  const { update : update_signer } = useSigner()

  const [ network, setNetwork ] = useState<Network>(store.network as Network)

  const update = () => {
    const config = CONFIG.servers[network as keyof typeof CONFIG.servers]
    update_client(config)
    update_signer(config)
    setNetwork(network)
    update_config({ network })
    console.log('updated config:', config)
    toast.success(`Settings Updated`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
    })
  }

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Group style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Title order={2} mb={15}>Settings</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Adjust your settings for interacting with the API, such as changing networks.
          </Text>
          <Divider mb={30} mt={20} />
          <Box>
            <NativeSelect
              label="Choose Network"
              data={[ 'mutiny', 'regtest', 'signet', 'testnet' ]}
              maw={300}
              value={network}
              onChange={(e) => setNetwork(e.target.value as Network)}
            />
            <Space h="xs" />
            <Button
              style={{
                borderRadius: '15px',
                backgroundColor: '#0068FD'
              }}
              onClick={update}
            >
              Update
            </Button>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Box>   
        </div>
      </Group>
    </Card>
  )
}
