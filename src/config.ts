export const settings = {
  engine  : 'cvm',
  network : 'mutiny'
}

export const servers = {
  mutiny : {
    network    : 'mutiny',
    oracle_url : 'https://mutinynet.com',
    server_pk  : '33f9d5a021afdffb864153eefa5d353d53e2d22053dadf8577c0e2b524bac794',
    server_url : 'https://bitescrow-mutiny.vercel.app',
  },
  regtest : {
    network    : 'regtest',
    oracle_url : 'http://localhost:3300',
    server_pk  : '33f9d5a021afdffb864153eefa5d353d53e2d22053dadf8577c0e2b524bac794',
    server_url : 'http://localhost:3001'
  },
  signet : {
    network    : 'signet',
    oracle_url : 'https://mempool.space/signet',
    server_pk  : '33f9d5a021afdffb864153eefa5d353d53e2d22053dadf8577c0e2b524bac794',
    server_url : 'https://bitescrow-signet.vercel.app'
  },
  testnet : {
    network    : 'testnet',
    oracle_url : 'https://mempool.space/testnet',
    server_pk  : '33f9d5a021afdffb864153eefa5d353d53e2d22053dadf8577c0e2b524bac794',
    server_url : 'https://bitescrow-testnet.vercel.app'
  }
}
