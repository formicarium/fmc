import React from 'react'
import { Form as SemanticForm, Button } from 'semantic-ui-react';
import { Form, Field } from 'react-final-form'
import { FolderPathInput } from '~/modules/common/components/FolderPathInput';
import { OpenDialogOptions } from 'electron';
import { ObjectInspector } from 'react-inspector';
import { PromiseManager } from '~/modules/common/render-props/PromiseManager';
import { WithFMCSystem } from '~/modules/common/components/WithFMCSystem';
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import { BooleanInput } from '~/modules/common/components/BooleanInput';

export interface IDeployServiceFormValues {
  syncable: boolean
  folder?: string
  applicationName: string
  applicationDefinitionPath: string
  argsArray: Array<{key: string, value: string}>
}

export interface IDeployServiceFormProps {
  onSubmit: (values: IDeployServiceFormValues) => Promise<void>
}

const validateDeployServiceForm = (values: Partial<IDeployServiceFormProps>) => {
  return {}
}

const applicationDefinitionPathDialogOptions = {
  properties: ['openFile'],
  filters: [{
    name: 'JSON',
    extensions: ['json'],
  }],
} as OpenDialogOptions

const INITIAL_VALUES: Partial<IDeployServiceFormValues> = {
  applicationName: 'blabla',
  syncable: true
}
export const DeployServiceForm: React.SFC<IDeployServiceFormProps> = ({
  onSubmit,
}) => (
  <WithFMCSystem>
    {(system) => (
      <Form
        initialValues={INITIAL_VALUES}
        mutators={arrayMutators as any}
        onSubmit={onSubmit}
        validate={validateDeployServiceForm}
        render={({handleSubmit, submitting, invalid, form: {reset, mutators: { push, pop } }, values }) => (
          <SemanticForm onSubmit={() => handleSubmit().then(reset)}>
            <SemanticForm.Field disabled={submitting}>
              <label>Application Name</label>
              <Field
                name='applicationName'
                component='input'
              />
            </SemanticForm.Field>
            <SemanticForm.Field disabled={submitting}>
              <Field
                toggle
                label='Syncable?'
                name='syncable'
                component={BooleanInput}
              />
            </SemanticForm.Field>
            {values.syncable && <SemanticForm.Field disabled={submitting}>
              <label>Source code path</label>
              <Field
                name='folder'
                component={FolderPathInput}
              />
            </SemanticForm.Field>}
            <SemanticForm.Field disabled={submitting}>
              <label>Application definition JSON path</label>
              <Field
                name='applicationDefinitionPath'
                withValueLabel='Change file'
                emptyValueLabel='Select file'
                options={applicationDefinitionPathDialogOptions}
                component={FolderPathInput}
              />
              {values.applicationDefinitionPath && (
              <PromiseManager
                promise={() => system.filesService.safelyReadJSON(values.applicationDefinitionPath)}
                ErrorComponent={() => null}
                LoadingComponent={() => null}>
              {({ data }) => (
                <ObjectInspector data={data}/>
              )}
              </PromiseManager>
            )}
            </SemanticForm.Field>

            <SemanticForm.Field>
              <label>
                Arbitrary arg map
              </label>

              <FieldArray name='argsArray'>
                {({ fields }) =>
                  fields.map((name, index) => (
                    <div key={name} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                      <Field
                        name={`${name}.key`}
                        component='input'
                        placeholder='Key'
                        style={{marginRight: 10}}
                      />
                      <Field
                        name={`${name}.value`}
                        component='input'
                        placeholder='Value'
                      />
                      <span
                        onClick={() => fields.remove(index)}
                        style={{ cursor: 'pointer', paddingLeft: 20, paddingRight: 20 }}>
                        ❌
                      </span>
                    </div>
                  ))}
              </FieldArray>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button
                icon='add'
                color='green'
                basic
                onClick={(e) => {
                  e.preventDefault()
                  push('argsArray', undefined)
                }}
                style={{marginBottom: 10}}
              />
              </div>

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
        )}
      />
    )}
  </WithFMCSystem>
)
