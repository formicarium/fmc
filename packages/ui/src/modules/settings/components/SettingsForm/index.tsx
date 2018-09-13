import React from 'react'
import { Form as SemanticForm, Button, Segment } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form'

const validate = () => {
  return {}
}

export interface ISettingsFormValue {
  kubectlBin: string
}

export interface ISettingsForm {
  initialValues: Partial<ISettingsFormValue>
  onSubmit: (values: ISettingsFormValue) => void
}

export const SettingsForm: React.SFC<ISettingsForm> = ({
  onSubmit,
  initialValues,
}) => (
  <Segment>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({handleSubmit, submitting, invalid}) => {
        return (
          <SemanticForm onSubmit={handleSubmit}>
            <SemanticForm.Field disabled={submitting}>
              <label>Kubectl binary</label>
              <Field
                name='kubectlBin'
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
                Save
              </Button>
            </div>
          </SemanticForm>
        )
      }}
    />
  </Segment>
)
