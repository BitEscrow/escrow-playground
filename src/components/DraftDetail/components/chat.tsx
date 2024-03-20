import { Buff } from '@cmdcode/buff'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Group,
  ScrollArea,
  TextInput
} from '@mantine/core'

import {
  DraftData,
  DraftSession
} from '@scrow/core'
import { IconSend2 } from '@tabler/icons-react'


interface Props {
  data    : DraftData
  session : DraftSession
}

// Alias formula:
// Two BIP-39 words (how much entropy is that?), plus two bytes of hex.
// Take the first two bytes as a suffix.
// Take 4 more bytes, two for each word (reduced to 11 bits each).

export default function ({ session } : Props) {

  const [ init, setInit ]   = useState(false)
  const [ input, setInput ] = useState('')
  const [ msgs, setMsgs ]   = useState<string[]>([])

  const alias = get_alias(session.pubkey)

  const send = () => {
    const msg = `${alias}: ${input}`
    session.send('chat', msg)
    setMsgs((e) => [ ...e, msg ])
    setInput('')
  }

  useEffect(() => {
    if (!init) {
      session.on_topic('chat', (msg) => {
        if (msg.envelope.pubkey !== session.mship.pub) {
          setMsgs((e) => [ ...e, msg.body as string ])
        }
      })
      setInit(true)
    }
  }, [ init ])

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '600px', backgroundColor: 'white' }}>
      <ScrollArea style={{ flexGrow: 1, padding: '10px', overflowY: 'auto' }}>
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
            {msgs.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '8px',
                  maxWidth: '60%',
                  padding: '8px 12px',
                  borderRadius: '16px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  wordWrap: 'break-word',
                  alignSelf: 'flex-start', 
                }}
              >
                {/* {msg} */}
                {/* Make the color of sender dynamic based on who is agent, funder, buyer, seller, etc. */}
                <strong style={{color: 'black'}}>{alias}</strong>{msg.substring(alias.length)} 
              </div>
            ))}
        </div>
      </ScrollArea>
      <Group justify="right" style={{ padding: '10px' }}>
        <TextInput
          style={{ flexGrow: 1 }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Type your message..."
        />
        <Button onClick={send} style={{backgroundColor: '#0068FD', borderRadius: '15px'}}><IconSend2 size={18}/></Button>
      </Group>
    </Box>
  )
}

// function ChatBox () {
//   return <pre>messages go here</pre>
// }

// function MessageBar () {
//   return (
//     <>
//       <TextInput onChange={(e) => }
//       />
//       <Button onClick={}>Send</Button>
//     </>
//   )
// }

function get_alias (pubkey : string) {
  const tag   = pubkey.slice(0, 4)
  const fname = Buff.hex(pubkey.slice(4, 6))
  const lname = Buff.hex(pubkey.slice(6, 8))
  // Do something here to choose words.
  return `${fname.hex}${lname.hex}#${tag}`
}
