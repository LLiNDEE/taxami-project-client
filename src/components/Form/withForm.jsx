import React from 'react'

import Form from './Form'

const withForm = Comp => ({schema, submitText, onSubmit, status, feedback, type, ...props}) => {
    return(
        <Form {...{schema, submitText, onSubmit, status, feedback, type}}>
            <Comp {...props} />
        </Form>
    )
}

export default withForm