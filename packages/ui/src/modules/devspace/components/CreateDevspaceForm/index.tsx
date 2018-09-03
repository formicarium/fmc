import React from 'react'
import { Form as SemanticForm, Button, Segment } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form'
import { PromiseButton } from '~/modules/common/components/PromiseButton';

const validate = () => {
  return {}
}

export interface IValues {
  name: string
}

export interface ICreateDevspaceFormProps {
  onSubmit: (values: IValues) => void
}

export const CreateDevspaceForm: React.SFC<ICreateDevspaceFormProps> = ({
  onSubmit,
}) => (
  <Segment basic>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({handleSubmit, submitting, invalid}) => {
        return (
          <SemanticForm>
            <SemanticForm.Field disabled={submitting}>
              <label>Name</label>
              <Field
                name='name'
                component='input'
                placeholder='Name'
              />
            </SemanticForm.Field>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <PromiseButton
                onClick={(e: any) => handleSubmit(e)}
                color='purple'
                basic>
                Submit
              </PromiseButton>
            </div>
          </SemanticForm>
        )
      }}
    />
  </Segment>
)
