import React from 'react'

import Form from './Form'

const withForm = Comp => ({schema, submitText, onSubmit, status, feedback, ...props}) => {
    return(
        <Form {...{schema, submitText, onSubmit, status, feedback}}>
            <Comp {...props} />
        </Form>
    )
}

export default withForm