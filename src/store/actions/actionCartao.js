
const listCartao = cartao => {
    return ({
        type: 'LIST_CARTAO',
        payload: cartao
    })
}

export { listCartao }