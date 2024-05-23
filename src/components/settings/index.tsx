import { useState }  from 'react'
import { ChainNetwork }   from '@scrow/sdk/core'
import { useConfig } from '@/hooks/useConfig'

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

  const { store, update } = useConfig()

  const [ network, setNetwork ] = useState(store.network)

  const update_config = () => {
    const config = CONFIG.servers[network as keyof typeof CONFIG.servers]
    setNetwork(network)
    update({ network })
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
            Adjust the settings for your escrow client.
          </Text>
          <Divider mb={30} mt={20} />
          <Box>
            <NativeSelect
              label="Choose ChainNetwork"
              data={CONFIG.settings.networks}
              maw={300}
              value={network}
              onChange={(e) => setNetwork(e.target.value as ChainNetwork)}
            />
            <Space h="xs" />
            <Button
              style={{
                borderRadius: '15px',
                backgroundColor: '#0068FD'
              }}
              onClick={update_config}
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
