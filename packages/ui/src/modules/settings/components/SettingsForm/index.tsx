import React from 'react'
import { Form as SemanticForm, Button, Segment, Message } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form'
import { IKubectlVersion } from '@formicarium/common'
import _ from 'lodash'
import { DebouncedTextInput } from '~/modules/common/components/DebouncedTextInput';
import { validateKubectlBin, minMajorToSemanticString } from '~/modules/settings/components/SettingsForm/logic';

const validate = () => {
  return {}
}

export interface ISettingsFormValue {
  kubectlBin: string
}

export interface ISettingsForm {
  initialValues: Partial<ISettingsFormValue>
  lastObtainedVersion: IKubectlVersion | null
  setLastObtainedVersion: (version: IKubectlVersion) => void
  onSubmit: (values: ISettingsFormValue) => void
  getVersionForKubectlBin: (kubectlBin: string) => Promise<IKubectlVersion>
}

export const SettingsForm: React.SFC<ISettingsForm> = ({
  onSubmit,
  initialValues,
  lastObtainedVersion,
  setLastObtainedVersion,
  getVersionForKubectlBin,
}) => (
  <Segment>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({handleSubmit, submitting, invalid, validating, errors, values, valid, pristine, touched }) => {
        return (
          <SemanticForm
            onSubmit={handleSubmit}
            success={valid && !validating}
            error={!!errors && !validating}>
            <SemanticForm.Field disabled={submitting}>
              <label>Kubectl bin</label>
              <Field
                validate={validateKubectlBin(getVersionForKubectlBin, lastObtainedVersion, setLastObtainedVersion)}
                name='kubectlBin'
                component={DebouncedTextInput}
                placeholder='Name'
              />
              {(touched && validating) && <Message>
                Loading...
              </Message>}
              <Message error>
                {errors.kubectlBin}
              </Message>
              <Message success>
                {lastObtainedVersion && minMajorToSemanticString(lastObtainedVersion.clientVersion)}
              </Message>
            </SemanticForm.Field>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button
                type='submit'
                color='purple'
                loading={submitting || validating}
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
