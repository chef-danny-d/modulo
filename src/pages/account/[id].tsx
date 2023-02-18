import React, { Suspense } from 'react'
import Layout from '../../core/layouts/Layout'
import { useCurrentUser } from '../../users/hooks/useCurrentUser'
import updateUser from '../../users/mutations/updateUser'
import { useMutation } from '@blitzjs/rpc'
import Form, { FORM_ERROR } from '../../core/components/Form'
import { UpdateUser } from '../../auth/validations'
import LabeledTextField from '../../core/components/LabeledTextField'

const AccountPage = () => {
  return (
    <Layout>
      <h1>Account Page</h1>
      <Suspense>
        <AccountInfo />
      </Suspense>
    </Layout>
  )
}

const AccountInfo = () => {
  const currentUser = useCurrentUser()
  const [user] = useMutation(updateUser)
  console.log(currentUser)
  return (
    <div>
      {JSON.stringify(currentUser)}
      <Form
        initialValues={{ email: currentUser?.email, name: currentUser?.name || '' }}
        schema={UpdateUser}
        onSubmit={async (values) => {
          try {
            console.log(values)
            await user({ id: currentUser!.id, name: values.name, email: values.email })
          } catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
              // This error comes from Prisma
              return { email: 'This email is already being used' }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
        className='w-1/3 mx-auto'
        submitText={'Update'}
      >
        <LabeledTextField className='w-full' name='name' label='Name' placeholder='Name' />
        <LabeledTextField className='w-full' name='email' label='Email' placeholder='Email' />
      </Form>
    </div>
  )
}

export default AccountPage
