
const listCategoria = categoria => {
    return ({
        type: 'LIST_CATEGORIA',
        payload: categoria
    })
}

export { listCategoria }