import { useForm }        from '@mantine/form'
import { get_path_names } from '@scrow/sdk/proposal'
import { get_vm_engine }  from '@/lib/vms'
import { get_vm_config }  from '@scrow/sdk/vm'
import { useClient }      from '@/hooks/useClient'

import { Button, Fieldset, Group, NativeSelect, TagsInput } from '@mantine/core'

import {
  ContractData,
  EscrowSigner
} from '@scrow/sdk'


interface Props {
  contract : ContractData
  signer   : EscrowSigner
}

export default function ({ contract, signer } : Props) {
  const { activated, terms, vmid }  = contract
  const { client } = useClient()

  const pnames = get_path_names(terms.paths)
  const vm     = get_vm_engine(terms.engine)

  const form = useForm({
    initialValues : {
      method : vm.methods[0],
      action : vm.actions[0],
      path   : pnames[0],
      args   : []
    }
  })

  const submit = () => {
    form.validate()
    if (activated && form.isValid()) {
      const config = get_vm_config(contract) 
      const tmpl   = form.getValues()
      console.log('template:', tmpl)
      const req    = signer.witness.create(config, tmpl)
      client.vm.submit(vmid, req).then(res => {
        if (res.ok) {
          console.log(res.data.receipt)
        }
      })
    }
  }

  return (
    <Fieldset legend="Submit a Statement">
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
    </Fieldset>
  )
}