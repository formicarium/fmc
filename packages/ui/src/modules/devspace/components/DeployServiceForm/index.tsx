import React from 'react'
import { Form as SemanticForm, Button, Segment } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form'

export interface IDeployServiceFormValues {
  name: string
}

export interface IDeployServiceFormProps {
  onSubmit: (values: IDeployServiceFormValues) => Promise<void>
}

const validateDeployServiceForm = (values: Partial<IDeployServiceFormProps>) => {
  return {}
}

export const DeployServiceForm: React.SFC<IDeployServiceFormProps> = ({
  onSubmit,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={validateDeployServiceForm}
    render={({handleSubmit, submitting, invalid, form}) => {
      return (
        <SemanticForm onSubmit={() => handleSubmit().then(form.reset)}>
          <SemanticForm.Field disabled={submitting}>
            <label>Name</label>
            <Field
              name='name'
              component='input'
              placeholder='Name'
            />
          </SemanticForm.Field>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              type='submit'
              color='purple'
              loading={submitting}
              disabled={submitting || invalid}
              basic >
              Deploy
            </Button>
          </div>
        </SemanticForm>
      )
    }}
  />
)
