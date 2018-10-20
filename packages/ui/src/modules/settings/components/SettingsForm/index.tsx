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
  kubectlContext: string
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
      render={({handleSubmit, submitting, invalid, validating, errors, valid, touched }) => (
        <SemanticForm
          onSubmit={handleSubmit}
          success={valid && !validating}
          error={!!errors && !validating}>
          <SemanticForm.Field disabled={submitting}>
            <label>Kubectl ctx</label>
            <Field
              name='kubectlContext'
              component={DebouncedTextInput}
              placeholder='Context'
            />
          </SemanticForm.Field>
          <SemanticForm.Field disabled={submitting}>
            <label>Kubectl bin</label>
            <Field
              name='kubectlBin'
              component={DebouncedTextInput}
              validate={validateKubectlBin(getVersionForKubectlBin, lastObtainedVersion, setLastObtainedVersion)}
              placeholder='Name'
            />
            {/* Loading */}
            {(touched && validating) && (
              <Message>
                Checking bin...
              </Message>
            )}
            {/* Erorr */}
            <Message error>
              {errors.kubectlBin}
            </Message>
            {/* Success */}
            <Message success>
              {lastObtainedVersion && minMajorToSemanticString(lastObtainedVersion.clientVersion)}
            </Message>
          </SemanticForm.Field>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              type='submit'
              color='purple'
              loading={submitting || validating}
              disabled={submitting || invalid || validating}
              basic
            >
              Save
            </Button>
          </div>
        </SemanticForm>
      )}
    />
  </Segment>
)
