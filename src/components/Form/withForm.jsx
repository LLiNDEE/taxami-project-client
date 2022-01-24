import React from 'react'

import Form from './Form'

const withForm = Comp => ({schema, submitText, onSubmit, ...props}) => {
    return(
        <Form {...{schema, submitText, onSubmit}}>
            <Comp {...props} />
        </Form>
    )
}

export default withForm