import React from 'react'
import { Form as SemanticForm, Button, Segment, Message } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form'
import { IKubectlVersion, IMinMajor } from '@formicarium/common'
import compareVersions from 'compare-versions'
import { TextInput } from '~/modules/common/components/TextInput';
import _ from 'lodash'
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { DisplayError } from '~/modules/common/components/DisplayError';
import { DisplayLoader } from '~/modules/common/components/DisplayLoader';

const validate = () => {
  return {}
}

export interface ISettingsFormValue {
  kubectlBin: string
}

export interface ISettingsForm {
  initialValues: Partial<ISettingsFormValue>
  onSubmit: (values: ISettingsFormValue) => void
  getVersionForKubectlBin: (kubectlBin: string) => Promise<IKubectlVersion>
}

const minMajorToSemanticString = (minMajor: IMinMajor) => `${minMajor.major}.${minMajor.minor}.0`
const MIN_KUBECTL_VERSION: IMinMajor = {
  major: '1',
  minor: '9'
}

const validateKubectlBin = (getVersionForKubectlBin: ISettingsForm['getVersionForKubectlBin']) => _.memoize(async (value: string) => {
  try {
    const { clientVersion } = await getVersionForKubectlBin(value)
    if (compareVersions(
      minMajorToSemanticString(clientVersion),
      minMajorToSemanticString(MIN_KUBECTL_VERSION)
    ) === -1) {
      const { major, minor } = MIN_KUBECTL_VERSION
      return `Version needs to be greater than ${major}.${minor}`
    }
  } catch (err) {
    return 'Invalid bin!'
  }
})

export const SettingsForm: React.SFC<ISettingsForm> = ({
  onSubmit,
  initialValues,
  getVersionForKubectlBin,
}) => (
  <Segment>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({handleSubmit, submitting, invalid, validating, errors, values, valid }) => {
        return (
          <SemanticForm onSubmit={handleSubmit} success={valid} error={!!errors}>
            <SemanticForm.Field disabled={submitting}>
              <label>Kubectl bin</label>
              <Field
                validate={validateKubectlBin(getVersionForKubectlBin)}
                name='kubectlBin'
                component={TextInput}
                placeholder='Name'
              />
              <Message error>
                {errors.kubectlBin}
              </Message>
              <PromiseManager
              promise={() => getVersionForKubectlBin(values.kubectlBin)}
              ErrorComponent={DisplayError}
              LoadingComponent={DisplayLoader}>
              {({ data }) => (
                <Message success>
                  {minMajorToSemanticString(data.clientVersion)}
                </Message>
              )}
            </PromiseManager>
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
