import { useNavigate }  from 'react-router-dom'
import { useDraftList } from '@scrow/hooks/draft'
import { useConfig }    from '@/hooks/useConfig'
import { IconRefresh, IconTrash, IconZoomScan }    from '@tabler/icons-react'
import { EscrowSigner } from '@scrow/core'

import {
  Table,
  Paper,
  Group,
  Center,
  Text,
  Menu,
  MenuItem,
  ActionIcon,
  Loader,
  Button
} from '@mantine/core'

import styles from './styles.module.sass'

interface Props {
  signer : EscrowSigner
}

export default function ContractTable ({ signer } : Props) {

  const { store } = useConfig()
  const navigate = useNavigate()

  const { data, isLoading, refresh, remove } = useDraftList(store.relay, signer)

  const load_draft = (secret : string) => {
    navigate(`/drafts/${secret}`)
  }

  const rows = data.map((row) => (
    <tr key={row.topic_id} className={styles.tableRow}>
      <td>
        <button  onClick={() => load_draft(row.secret)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transform: 'translateY(2px)' }}>
            <IconZoomScan size={17} color="gray" />
        </button>
      </td>
      <td><span onClick={() => load_draft(row.secret)} style={{ color: '#54B251' }}>{`${row.topic_id.slice(0, 10)}...${row.topic_id.slice(-10)}`}</span></td>
      <td><span style={{ color: '#0068FE' }}>{row.updated_at}</span></td>
     <td>
        <Menu
          position="top"
        >
          <Menu.Target>
            <ActionIcon variant="subtle" color="red" style={{ backgroundColor: 'transparent' }}>
              <IconTrash size={17} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <MenuItem
              onClick={() => remove(row.secret)}
              color="red"
            >
              Confirm Deletion?
            </MenuItem>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ))

  return (
    <>
      { isLoading && <Center><Loader color="blue" /></Center> }
      { !isLoading &&
        <>
          { data.length > 0 ? (
              <Paper>
                <Table style={{ minWidth: '500px', width: '100%' }}>
                  <thead>
                <tr>
                      <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>View</th>
                      <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Session ID</th>
                      <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Updated At</th>
                      <th style={{ position: 'sticky', textAlign: 'right', top: 0, backgroundColor: 'white', color: 'black' }}></th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </Paper>
          ) : (
            <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
              <Text c="dimmed">You have no active drafts.</Text>
            </Center>
        )}
        <Group justify="right" style={{ width: '100%', marginTop: '30px' }}>
        <Button
          onClick={refresh} 
          variant='subtle'
          mt={30}
          w={150}
          leftSection={<IconRefresh size={14} />}
          style={{
            color: '#0068FE',
            borderRadius: '15px'
          }}
        >
  Refresh
        </Button>
        </Group>
        </>
      }
    </>
  )
}
