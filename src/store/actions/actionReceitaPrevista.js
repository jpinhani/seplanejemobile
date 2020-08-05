
const listReceitaPrevista = receitaPrevista => {
    return ({
        type: 'LIST_RECEITAPREVISTA',
        payload: receitaPrevista
    })
}

export { listReceitaPrevista }