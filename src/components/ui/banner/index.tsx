import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export default function BetaBanner() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" withCloseButton color="#0068FD" title=" Attention: Beta Release Notice" icon={icon}>
      We are currently in beta testing phase. Please note that this API and playground are currently only available on test networks and not the mainnet Bitcoin blockchain just yet. Thank you for your understanding as we work towards full integration.
    </Alert>
  );
}