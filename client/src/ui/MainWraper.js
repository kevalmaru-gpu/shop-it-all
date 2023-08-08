import React from 'react'

function MainWraper(props) {
    return (
        <>
            {
                props.isLoading ? <div></div> : props.children
            }
        </>
    )
}

export default MainWraper