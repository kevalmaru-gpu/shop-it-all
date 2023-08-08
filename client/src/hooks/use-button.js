const useButton = (submit) => {
    const validity = submit()

    return { validity }
}

export default useButton