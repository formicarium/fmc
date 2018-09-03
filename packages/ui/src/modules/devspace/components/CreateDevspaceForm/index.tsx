import React from 'react'
import { Form, Button, Segment } from 'semantic-ui-react';

export const CreateDevspaceForm: React.SFC = () => (
  <Segment basic>
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Name' />
      </Form.Field>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button color='purple' type='submit'>Submit</Button>
      </div>
    </Form>
  </Segment>
)
