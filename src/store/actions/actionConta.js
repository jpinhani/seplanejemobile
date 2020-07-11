
const listConta = conta => {
    return ({
        type: 'LIST_CONTA',
        payload: conta
    })
}

export { listConta }