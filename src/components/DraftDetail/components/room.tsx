import { useEffect, useState } from 'react'

import { useNavigate }     from 'react-router-dom'
import { EscrowSigner }    from '@scrow/core'
import { useClient }       from '@scrow/hooks/client'
import { useConfig }       from '@/hooks/useConfig'
import { useMediaQuery }   from '@mantine/hooks'
import { useDraftSession } from '@scrow/hooks/draft'

import {
  Button,
  Center,
  Group,
  Divider,
  Text,
  Loader,
  Tabs,
} from '@mantine/core'

import Acks       from './acks'
import Chat       from './chat'
import Members    from './members'
import Roles      from './roles'
import Terms      from './terms'
import Seats      from './seats'
import Signatures from './signatures'


import {
  IconMessageCircle,
  IconPuzzle,
  IconRefresh,
  IconSend,
  IconUsersGroup,
} from '@tabler/icons-react'

interface Props {
  secret : string
  signer : EscrowSigner
}

export default function ({ secret, signer }: Props ) {
  
  const isMobile = useMediaQuery('(max-width: 768px)')


  const navigate = useNavigate()

  const { client } = useClient()
  const { store }  = useConfig()

  const [ init, setInit ] = useState(false)
  const [confirmPublish, setConfirmPublish] = useState(false); 
  const { data, session } = useDraftSession(store.relay, secret, signer)

  const publish = async () => {
    if (confirmPublish) {
      const ct = await session.publish(client);
      navigate(`/contracts/${ct.cid}`);
    } else {
      setConfirmPublish(true);
    }
  };
  useEffect(() => {
    if (!init) {
      session.once('published', (cid) => {
        navigate(`/contracts/${cid}`)
      })
      setInit(true)
    }
  }, [ init ])

  return (
    <>
      { !data && <Center><Loader color="blue" /></Center> }
      { data !== undefined &&
        <>
        <Text size='lg' fw={700}>Draft Details</Text>
        <Text size='sm' mb={30} c={'dimmed'}>Details and metadata of a contract. you can add paths, payment paths, and programs to it before publishing for review.</Text>
        <Terms data={ data } session={ session } />
        <Divider mb={40} mt={70} />
        <Text size='lg' fw={700}>Members</Text>
        <Text size='sm' mb={30} c={'dimmed'}>Chat with members about the draft and view member data.</Text>
        <div style={{ overflowX: 'auto', display: isMobile ? 'flex' : '' }}>
          <Tabs defaultValue="members">
            <Tabs.List grow style={{minWidth: '700px'}} mb={20}>
              <Tabs.Tab value="members" leftSection={<IconUsersGroup size={18}/>}>Members</Tabs.Tab>
              <Tabs.Tab value="chat" leftSection={<IconMessageCircle size={18}/>}>Chat</Tabs.Tab>
              <Tabs.Tab value="roles" leftSection={<IconPuzzle size={18}/>}>Roles</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="members" pt="xs">
              <Members data={ data } session={ session } />
            </Tabs.Panel>

            <Tabs.Panel value="chat" pt="xs">
              <Chat data={ data } session={ session } />
            </Tabs.Panel>

            <Tabs.Panel value="roles" pt="xs">
              <Roles data={ data } session={ session } />
            </Tabs.Panel>
          </Tabs>
        </div>
        <Divider mb={40} mt={70} />
        <Seats data={data} session={session} />
        <Divider mb={40} mt={55} />
        <Text size='lg' fw={700}>Endorsements</Text>
        <Text size='sm' mb={30} c={'dimmed'}>Endorse the draft to publish it, and see other endorsement signatures from other members.</Text>
        <Signatures data={data} session={session} />
        <Divider mb={20} mt={55} />
        <Acks data={ data } session={ session } />
        <Divider mb={20} mt={55} />
        <Text size='lg' fw={700}>Publishing</Text>
        <Text size='sm' mb={30} c={'dimmed'}>After reviewing all of the data in the draft, finalize everything and publish for review.</Text>
        <Group>
        <Button
          leftSection={<IconSend size={14} />}
          style={{ borderRadius: '15px', backgroundColor: '#0068FD' }}
          disabled={!session.is_confirmed}
          onClick={publish}
        >
          {confirmPublish ? 'Confirm Publish?' : 'Publish'}
        </Button>
          <Button
            variant='subtle'
            leftSection={<IconRefresh size={14}/>}
            style={{
              borderRadius: '15px',
              color: '#0068FD'
           }}
            disabled = {!session.is_ready}
            onClick  = {() => session.refresh() }
          >
            Refresh
          </Button>
        </Group>
        </>
      }
    </>
  )
}