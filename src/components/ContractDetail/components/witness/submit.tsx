import { useForm }            from '@mantine/form'
import { CoreLib }            from '@scrow/sdk'
import { get_vm_engine }      from '@/lib/vms'
import { useClient }          from '@/hooks/useClient'
import { useContractUpdate }  from '@scrow/hooks/contract'
import { get_machine_config } from '@scrow/sdk/machine'

import { useErrResToast, useErrorToast } from '@/hooks/useToast'

import { Button, Card, Group, NativeSelect, TagsInput, Textarea } from '@mantine/core'

import {
  ContractData,
  EscrowSigner,
  WitnessReceipt
} from '@scrow/sdk'

interface Props {
  contract : ContractData
  signer   : EscrowSigner
  update   : (receipts : WitnessReceipt[]) => void
}

export default function ({ contract, signer, update } : Props) {
  const { activated, cid, terms } = contract

  const { client } = useClient()
  const ct_update  = useContractUpdate(client)

  const pnames = CoreLib.proposal.get_path_names(terms.paths)
  const vm     = get_vm_engine(terms.engine)

  const form = useForm({
    initialValues : {
      method  : vm.methods[0],
      action  : vm.actions[0],
      content : '',
      path    : pnames[0],
      args    : []
    }
  })

  const submit = () => {
    form.validate()
    if (activated && form.isValid()) {
      try {
        const config = get_machine_config(contract)
        const tmpl   = form.getValues()
        console.log('witness template:', tmpl)
        const req    = signer.witness.create(config, tmpl)
        client.machine.submit(req).then(res => {
          if (res.ok) {
            update([ res.data.receipt ])
            ct_update(cid)
          } else {
            useErrResToast(res)
          }
        })
      } catch (err) {
        useErrorToast('Submit Error', err)
      }
    }
  }

  return (
    <Card withBorder>
      <Group>
        <NativeSelect
          label="Method"
          description="Method to call in the VM."
          data={vm.methods}
          {...form.getInputProps('method')}
        />
        <NativeSelect
          label="Action"
          description="Desired action to execute."
          data={vm.actions}
          {...form.getInputProps('action')}
        />
        <NativeSelect
          label="Path"
          description="Spending path to select for action."
          data={pnames}
          {...form.getInputProps('path')}
        />
      </Group>
      <Textarea
        label="Content"
        description="A free-form content field."
        {...form.getInputProps('content')}
      />
      <TagsInput
        label="Arguments"
        splitChars={[' ', ',']}
        description="A space-separated list of additional arguments."
        {...form.getInputProps('args')}
      />
      <Button
        mt={15}
        onClick={submit}
      >
        Submit
      </Button>
    </Card>
  )
}