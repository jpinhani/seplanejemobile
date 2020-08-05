
const listDespesaPrevista = despesaPrevista => {
    return ({
        type: 'LIST_DESPESAPREVISTA',
        payload: despesaPrevista
    })
}

export { listDespesaPrevista }